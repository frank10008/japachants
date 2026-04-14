#!/usr/bin/env tsx
/**
 * Sample QC: pull a random sample of verses that have English meanings, along
 * with their Sanskrit text, and dump them to cache/qc-sample.json for a
 * verification agent to review.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const OUT = path.join(process.cwd(), "cache", "qc-sample.json");

function main() {
  const sampleSize = Number(process.argv[2] || "80");
  const db = new Database(DB_PATH);

  const rows = db
    .prepare(
      `SELECT c.slug, c.title, v.verse_number, v.sanskrit, v.transliteration, v.meaning
       FROM verses v
       JOIN chants c ON v.chant_id = c.id
       WHERE v.meaning IS NOT NULL AND length(v.meaning) > 0
       ORDER BY random()
       LIMIT ?`
    )
    .all(sampleSize) as {
    slug: string;
    title: string;
    verse_number: number;
    sanskrit: string | null;
    transliteration: string | null;
    meaning: string;
  }[];

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(rows, null, 2));
  console.log(`Wrote ${rows.length} sample rows to ${OUT}`);

  const stats = {
    total_verses_with_meaning: (db
      .prepare(
        "SELECT COUNT(*) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0"
      )
      .get() as { n: number }).n,
    chants_with_any_meaning: (db
      .prepare(
        "SELECT COUNT(DISTINCT chant_id) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0"
      )
      .get() as { n: number }).n,
    chants_with_full_coverage: (db
      .prepare(
        `SELECT COUNT(*) as n FROM chants c
         WHERE verse_count > 0
         AND NOT EXISTS (
           SELECT 1 FROM verses v
           WHERE v.chant_id = c.id
           AND (v.meaning IS NULL OR length(v.meaning) = 0)
         )`
      )
      .get() as { n: number }).n,
    total_chants: (db.prepare("SELECT COUNT(*) as n FROM chants").get() as { n: number }).n,
  };
  console.log(`\nCoverage stats:`);
  console.log(JSON.stringify(stats, null, 2));
}

main();
