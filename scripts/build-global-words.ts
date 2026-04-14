#!/usr/bin/env tsx
/**
 * Build a global Devanagari word → meaning index from the per-chant word_meanings
 * table. Aggregates all known glosses + sub-word breakdowns across the whole
 * library so that a word with a known meaning in one chant lights up in every
 * chant that contains it.
 *
 * Writes to table `global_words (norm_word, word_devanagari, iast_variants, glosses)`.
 */
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");

function normalize(s: string): string {
  return s
    .replace(/[\u0964\u0965।॥0-9०-९\s·,.:;!?\-–—"'()[\]{}|]+/g, "")
    .trim()
    .toLowerCase();
}

// Strip enclosing brackets/parens/quotes from short glosses
function cleanGloss(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

type Gloss = {
  gloss: string;
  source: string; // chant slug
  breakdown: { devanagari: string; iast: string; meaning: string }[];
};

type Entry = {
  devanagari: string;
  iast_variants: Set<string>;
  glosses: Gloss[];
};

function addGloss(e: Entry, g: Gloss) {
  const key = g.gloss.toLowerCase().replace(/[\s()[\]]+/g, " ").trim();
  if (!key) return;
  if (e.glosses.some((x) => x.gloss.toLowerCase().replace(/[\s()[\]]+/g, " ").trim() === key)) return;
  e.glosses.push(g);
}

function upsert(
  map: Map<string, Entry>,
  devanagari: string,
  iast: string,
  gloss: string,
  source: string,
  breakdown: { devanagari: string; iast: string; meaning: string }[]
) {
  const norm = normalize(devanagari);
  if (!norm) return;
  let e = map.get(norm);
  if (!e) {
    e = { devanagari, iast_variants: new Set(), glosses: [] };
    map.set(norm, e);
  }
  if (iast) e.iast_variants.add(iast);
  if (gloss) addGloss(e, { gloss: cleanGloss(gloss), source, breakdown });
}

function main() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS global_words (
      id INTEGER PRIMARY KEY,
      norm_word TEXT UNIQUE NOT NULL,
      word_devanagari TEXT NOT NULL,
      iast_variants TEXT NOT NULL,
      glosses TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_gw_norm ON global_words(norm_word);
  `);

  // Load every per-chant word meaning
  const rows = db
    .prepare(
      `SELECT wm.word_devanagari, wm.word_iast, wm.gloss, wm.breakdown, c.slug
       FROM word_meanings wm
       JOIN chants c ON wm.chant_id = c.id`
    )
    .all() as {
    word_devanagari: string | null;
    word_iast: string | null;
    gloss: string | null;
    breakdown: string;
    slug: string;
  }[];

  const entries = new Map<string, Entry>();

  for (const r of rows) {
    const breakdown: { devanagari: string; iast: string; meaning: string }[] = (() => {
      try {
        return JSON.parse(r.breakdown || "[]");
      } catch {
        return [];
      }
    })();

    if (r.word_devanagari && r.gloss) {
      upsert(
        entries,
        r.word_devanagari,
        r.word_iast || "",
        r.gloss,
        r.slug,
        breakdown
      );
    }

    // Also add each breakdown sub-word as a standalone entry so common tokens
    // (like नमः, तत्, सः, हरि, ॐ, etc.) light up across the whole library.
    for (const b of breakdown) {
      if (b.devanagari && b.meaning) {
        upsert(entries, b.devanagari, b.iast || "", b.meaning, r.slug, []);
      }
    }
  }

  // Also crack compound words: many greenmesg entries are multi-syllable
  // compounds like "Yuddha-Parishraantam" — we already add the breakdown
  // sub-words above. Nothing to do here for now.

  // Write
  db.exec("DELETE FROM global_words");
  const insert = db.prepare(
    "INSERT INTO global_words (norm_word, word_devanagari, iast_variants, glosses) VALUES (?, ?, ?, ?)"
  );
  const tx = db.transaction(() => {
    for (const [norm, e] of entries) {
      insert.run(
        norm,
        e.devanagari,
        JSON.stringify([...e.iast_variants]),
        JSON.stringify(e.glosses)
      );
    }
  });
  tx();

  const n = entries.size;
  const totalGlosses = [...entries.values()].reduce((s, e) => s + e.glosses.length, 0);
  console.log(`global_words: ${n} unique words, ${totalGlosses} total glosses`);

  // Sanity dump — common words that should have meanings
  const sample = db
    .prepare("SELECT norm_word, word_devanagari, glosses FROM global_words WHERE norm_word IN ('namah','rama','shiva','govinda','brahma','tato','kuru','hari','sarva','deva') LIMIT 20")
    .all();
  console.log("\nSample common words:");
  for (const row of sample as { norm_word: string; word_devanagari: string; glosses: string }[]) {
    const g = JSON.parse(row.glosses);
    console.log(`  ${row.norm_word} (${row.word_devanagari}): ${g.length} gloss(es) — "${g[0]?.gloss?.slice(0, 60) ?? ""}"`);
  }
}

main();
