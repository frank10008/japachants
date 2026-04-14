#!/usr/bin/env tsx
/**
 * Find chants that are content-wise duplicates (every verse's Sanskrit
 * matches another chant's verse at the same position), pick one canonical
 * slug to keep, and delete the others.
 *
 * Canonical-slug rules:
 *   - Prefer shorter slugs when one is a superset prefix of the other
 *   - Prefer 'srimad-bhagawad-gita-*' over 'bhagavadgita-parayana-*'
 *   - Prefer the slug that already has more verse meanings
 *
 * Dry-run by default. Pass --execute to actually delete.
 */
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");

type Chant = {
  id: number;
  slug: string;
  title: string;
  verse_count: number;
  meaning_count: number;
};

function contentHash(db: Database.Database, chantId: number): string {
  const verses = db
    .prepare(
      "SELECT verse_number, sanskrit FROM verses WHERE chant_id = ? ORDER BY verse_number"
    )
    .all(chantId) as { verse_number: number; sanskrit: string | null }[];
  // Aggressive normalize: keep only Devanagari LETTERS (U+0905..0939),
  // drop vowel signs, virama, svara marks, whitespace, punctuation, numerals.
  // This collapses sandhi variants (पाण्डुपुत्राणाम् vs पाण्डुपुत्राणाम)
  // and transcription-convention differences to the same hash.
  return verses
    .map((v) =>
      (v.sanskrit || "").replace(/[^\u0905-\u0939]/g, "")
    )
    .join("");
}

function preferred(a: Chant, b: Chant): Chant {
  // 1. Canonical Bhagavad Gita family rule
  const aBg = a.slug.startsWith("srimad-bhagawad-gita-");
  const bBg = b.slug.startsWith("srimad-bhagawad-gita-");
  if (aBg && !bBg) return a;
  if (bBg && !aBg) return b;

  // 2. More meanings wins
  if (a.meaning_count !== b.meaning_count) {
    return a.meaning_count > b.meaning_count ? a : b;
  }

  // 3. Longer verse count (more complete) wins
  if (a.verse_count !== b.verse_count) {
    return a.verse_count > b.verse_count ? a : b;
  }

  // 4. Shorter slug wins (simpler name)
  return a.slug.length <= b.slug.length ? a : b;
}

function main() {
  const execute = process.argv.includes("--execute");
  const db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON");

  const chants = db
    .prepare(
      `SELECT c.id, c.slug, c.title, c.verse_count,
              (SELECT COUNT(*) FROM verses v
               WHERE v.chant_id = c.id
                 AND v.meaning IS NOT NULL AND length(v.meaning) > 0) AS meaning_count
       FROM chants c`
    )
    .all() as Chant[];

  console.log(`Computing content hashes for ${chants.length} chants...`);

  // Group by content hash — but hash is expensive (verse scan), do it once
  const hashToChants = new Map<string, Chant[]>();
  for (const c of chants) {
    const h = contentHash(db, c.id);
    if (h.length < 40) continue; // skip carnatic 1-verse pedagogy exercises
    const list = hashToChants.get(h) || [];
    list.push(c);
    hashToChants.set(h, list);
  }

  // Collect groups with >1 chant
  const dupeGroups = [...hashToChants.values()].filter((g) => g.length > 1);

  // Explicit slug-family aliases for cases where text has trivial sandhi or
  // transcription differences (hash doesn't match but content is same).
  // Format: [canonicalSlug, duplicateSlug]
  const bySlug = new Map(chants.map((c) => [c.slug, c]));
  const ALIASES: [string, string][] = [];
  for (let ch = 1; ch <= 18; ch++) {
    ALIASES.push([
      `srimad-bhagawad-gita-chapter-${ch}`,
      `bhagavadgita-parayana-chapter-${ch}`,
    ]);
  }
  for (const [canonSlug, dupeSlug] of ALIASES) {
    const canon = bySlug.get(canonSlug);
    const dupe = bySlug.get(dupeSlug);
    if (canon && dupe) {
      // Check they aren't already in a detected group
      const already = dupeGroups.some(
        (g) => g.some((c) => c.id === canon.id) || g.some((c) => c.id === dupe.id)
      );
      if (!already) dupeGroups.push([canon, dupe]);
    }
  }

  console.log(`Found ${dupeGroups.length} duplicate groups`);

  type Action = { keep: Chant; drop: Chant[] };
  const actions: Action[] = [];
  for (const group of dupeGroups) {
    let canonical = group[0];
    for (let i = 1; i < group.length; i++) canonical = preferred(canonical, group[i]);
    const drop = group.filter((c) => c.id !== canonical.id);
    actions.push({ keep: canonical, drop });
  }

  let totalDropped = 0;
  let versesDropped = 0;
  for (const a of actions) {
    console.log(`\n keep: ${a.keep.slug} (${a.keep.verse_count}v, ${a.keep.meaning_count} meanings)`);
    for (const d of a.drop) {
      console.log(`  drop: ${d.slug} (${d.verse_count}v, ${d.meaning_count} meanings)`);
      totalDropped++;
      versesDropped += d.verse_count;
    }
  }

  console.log(`\nTotal: ${totalDropped} chants to drop (${versesDropped} verses)`);

  if (!execute) {
    console.log("\nDry run. Pass --execute to delete.");
    return;
  }

  // Before deleting a duplicate, first copy any meanings it has that the
  // canonical is missing. This rescues work from the dropped slug.
  const migrate = db.prepare(
    `UPDATE verses AS target SET meaning = (
       SELECT src.meaning FROM verses src
       WHERE src.chant_id = ? AND src.verse_number = target.verse_number
             AND src.meaning IS NOT NULL AND length(src.meaning) > 0
     )
     WHERE target.chant_id = ? AND (target.meaning IS NULL OR length(target.meaning) = 0)
       AND EXISTS (
         SELECT 1 FROM verses src
         WHERE src.chant_id = ? AND src.verse_number = target.verse_number
               AND src.meaning IS NOT NULL AND length(src.meaning) > 0
       )`
  );
  const deleteChant = db.prepare("DELETE FROM chants WHERE id = ?");

  const tx = db.transaction(() => {
    for (const a of actions) {
      for (const d of a.drop) {
        migrate.run(d.id, a.keep.id, d.id);
        deleteChant.run(d.id);
      }
    }
  });
  tx();

  const left = (db.prepare("SELECT COUNT(*) as n FROM chants").get() as { n: number }).n;
  const lefts = (db.prepare("SELECT COUNT(*) as n FROM verses").get() as { n: number }).n;
  console.log(`\nAfter delete: ${left} chants, ${lefts} verses`);
}

main();
