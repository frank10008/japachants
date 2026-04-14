#!/usr/bin/env tsx
/**
 * Merge per-verse meanings produced by the parallel scraper agents.
 *
 * Inputs (optional — any that exist are used):
 *   cache/wiki-meanings.json
 *   cache/wikisource-meanings.json
 *
 * Both have the shape:
 *   [
 *     {
 *       "chant_slug": "hanuman-chalisa",
 *       "source_url": "https://...",
 *       "verses": [{ "verse_number": N, "meaning": "..." }, ...]
 *     }
 *   ]
 *
 * Rules:
 *   - Don't overwrite a non-empty existing meaning unless --force is passed
 *   - Ignore verse_numbers that don't exist in the chant
 *   - Record source in chant_links
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

type FileEntry = {
  chant_slug: string;
  source_url: string;
  verses: { verse_number: number; meaning: string }[];
};

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const CACHE_DIR = path.join(process.cwd(), "cache");
const INPUT_FILES = [
  "wiki-meanings.json",
  "wikisource-meanings.json",
  "gita-meanings.json",
  "upanishad-meanings.json",
];

function main() {
  const force = process.argv.includes("--force");
  const db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");

  // Build slug → chant_id index
  const chants = db.prepare("SELECT id, slug FROM chants").all() as {
    id: number;
    slug: string;
  }[];
  const bySlug = new Map(chants.map((c) => [c.slug, c.id]));

  db.exec(`
    CREATE TABLE IF NOT EXISTS chant_links (
      id INTEGER PRIMARY KEY,
      chant_id INTEGER REFERENCES chants(id) ON DELETE CASCADE,
      source TEXT,
      url TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_cl_chant ON chant_links(chant_id);
  `);

  const update = db.prepare(
    "UPDATE verses SET meaning = ? WHERE chant_id = ? AND verse_number = ?"
  );
  const getExisting = db.prepare(
    "SELECT meaning FROM verses WHERE chant_id = ? AND verse_number = ?"
  );
  const insertLink = db.prepare(
    "INSERT INTO chant_links (chant_id, source, url) VALUES (?, ?, ?)"
  );

  let totalFiles = 0;
  let totalEntries = 0;
  let matchedChants = 0;
  let updatedVerses = 0;
  let skippedExisting = 0;
  let skippedNoChant = 0;
  let skippedNoVerse = 0;

  for (const fname of INPUT_FILES) {
    const fpath = path.join(CACHE_DIR, fname);
    if (!fs.existsSync(fpath)) {
      console.log(`skip (missing): ${fname}`);
      continue;
    }
    totalFiles++;
    const raw = fs.readFileSync(fpath, "utf8");
    let data: FileEntry[];
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`parse error in ${fname}:`, e);
      continue;
    }
    if (!Array.isArray(data)) continue;
    console.log(`\n=== ${fname}: ${data.length} entries ===`);

    for (const entry of data) {
      totalEntries++;
      const chantId = bySlug.get(entry.chant_slug);
      if (!chantId) {
        skippedNoChant++;
        continue;
      }
      matchedChants++;
      let any = 0;
      const tx = db.transaction(() => {
        for (const v of entry.verses) {
          if (!v.meaning || v.meaning.length < 5) continue;
          const existing = getExisting.get(chantId, v.verse_number) as
            | { meaning: string | null }
            | undefined;
          if (!existing) {
            skippedNoVerse++;
            continue;
          }
          if (existing.meaning && existing.meaning.trim().length > 0 && !force) {
            skippedExisting++;
            continue;
          }
          update.run(v.meaning.replace(/\s+/g, " ").trim(), chantId, v.verse_number);
          updatedVerses++;
          any++;
        }
        if (any > 0 && entry.source_url) {
          insertLink.run(chantId, fname.replace(/-meanings\.json$/, ""), entry.source_url);
        }
      });
      tx();
      if (any > 0) console.log(`  ✓ ${entry.chant_slug} — ${any} verses`);
    }
  }

  console.log(
    `\nDone. files=${totalFiles} entries=${totalEntries} matched_chants=${matchedChants} updated_verses=${updatedVerses} skipped_existing=${skippedExisting} skipped_no_chant=${skippedNoChant} skipped_no_verse=${skippedNoVerse}`
  );
  const totalWithMeaning = (db
    .prepare(
      "SELECT COUNT(*) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0"
    )
    .get() as { n: number }).n;
  const totalVerses = (db.prepare("SELECT COUNT(*) as n FROM verses").get() as { n: number }).n;
  console.log(
    `DB: ${totalWithMeaning} / ${totalVerses} verses have meanings (${((totalWithMeaning / totalVerses) * 100).toFixed(1)}%)`
  );
}

main();
