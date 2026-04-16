#!/usr/bin/env tsx
/**
 * Merge all batch-NN-out.json files produced by the translator subagents
 * into the DB. Each output file's shape:
 *   [{ slug, title, verses: [{ id, verse_number, meaning }] }]
 *
 * Merge rules:
 *   - Update verses.meaning where existing is NULL or empty (don't overwrite)
 *   - Skip empty meanings (`""`)
 *   - Reject suspicious blobs (>800 chars)
 *   - Reject meanings containing leaked Devanagari or scraper chrome
 *   - Record source in chant_links
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const BATCH_DIR = path.join(process.cwd(), "cache", "batches");

type VerseOut = { id: number; verse_number: number; meaning: string };
type ChantOut = { slug: string; title?: string; verses: VerseOut[] };

function isSuspicious(s: string): { bad: boolean; reason?: string } {
  if (s.length === 0) return { bad: true, reason: "empty" };
  if (s.length > 800) return { bad: true, reason: `too long (${s.length})` };
  if (/[\u0900-\u097F]/.test(s)) return { bad: true, reason: "contains Devanagari" };
  if (/(<span|<\/|&nbsp;|&amp;|<br\b|<p\b|<img\b)/i.test(s))
    return { bad: true, reason: "contains HTML" };
  if (/^(note|click here|meaning:|source:)/i.test(s.trim()))
    return { bad: true, reason: "scraper chrome" };
  return { bad: false };
}

function main() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  const files = fs
    .readdirSync(BATCH_DIR)
    .filter((n) => /^(batch|haiku|sonnet|final)-\d+-out\.json$/.test(n))
    .sort();

  if (files.length === 0) {
    console.log("No batch-NN-out.json files found.");
    return;
  }

  console.log(`Merging ${files.length} batch output files...`);

  const update = db.prepare(
    "UPDATE verses SET meaning = ? WHERE id = ? AND (meaning IS NULL OR length(meaning) = 0)"
  );

  let totalRead = 0;
  let totalWritten = 0;
  let totalSkippedEmpty = 0;
  let totalRejected = 0;
  const rejectReasons = new Map<string, number>();

  const tx = db.transaction((batch: ChantOut[]) => {
    for (const chant of batch) {
      if (!Array.isArray(chant.verses)) continue;
      for (const v of chant.verses) {
        totalRead++;
        const meaning = (v.meaning || "").trim();
        if (!meaning) {
          totalSkippedEmpty++;
          continue;
        }
        const { bad, reason } = isSuspicious(meaning);
        if (bad) {
          totalRejected++;
          rejectReasons.set(reason!, (rejectReasons.get(reason!) || 0) + 1);
          continue;
        }
        const result = update.run(meaning, v.id);
        if (result.changes > 0) totalWritten++;
      }
    }
  });

  for (const fname of files) {
    const fpath = path.join(BATCH_DIR, fname);
    let data: ChantOut[];
    try {
      data = JSON.parse(fs.readFileSync(fpath, "utf8"));
    } catch (e) {
      console.error(`  ${fname}: parse error — ${e}`);
      continue;
    }
    if (!Array.isArray(data)) {
      console.error(`  ${fname}: not an array, skipping`);
      continue;
    }
    tx(data);
    console.log(`  ${fname}: ${data.length} chants`);
  }

  console.log(
    `\nRead: ${totalRead}, wrote: ${totalWritten}, empty: ${totalSkippedEmpty}, rejected: ${totalRejected}`
  );
  if (rejectReasons.size > 0) {
    console.log("Reject reasons:");
    for (const [reason, count] of rejectReasons) {
      console.log(`  ${count.toString().padStart(5)} ${reason}`);
    }
  }
  const stats = {
    total: (db.prepare("SELECT COUNT(*) as n FROM verses").get() as { n: number }).n,
    with_meaning: (db
      .prepare(
        "SELECT COUNT(*) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0"
      )
      .get() as { n: number }).n,
    chants_with_any: (db
      .prepare(
        "SELECT COUNT(DISTINCT chant_id) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0"
      )
      .get() as { n: number }).n,
    chants_full: (db
      .prepare(
        `SELECT COUNT(*) as n FROM chants c
         WHERE c.verse_count > 0
         AND NOT EXISTS (
           SELECT 1 FROM verses v
           WHERE v.chant_id = c.id AND (v.meaning IS NULL OR length(v.meaning) = 0)
         )`
      )
      .get() as { n: number }).n,
  };
  console.log(`\nCoverage: ${stats.with_meaning}/${stats.total} verses, ${stats.chants_with_any} chants have some meaning, ${stats.chants_full} chants at 100%.`);
}

main();
