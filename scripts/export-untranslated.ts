#!/usr/bin/env tsx
/**
 * Export untranslated chants (those with at least one verse missing an English
 * meaning) as JSON batches for parallel subagent translators.
 *
 * Output: cache/batches/batch-NN.json — each file contains a list of chant
 * objects, each with its verses that need translation. Subagents will read
 * these, produce translations, and write cache/batches/batch-NN-out.json.
 *
 * Usage: tsx scripts/export-untranslated.ts [batchCount=20]
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const OUT_DIR = path.join(process.cwd(), "cache", "batches");

// Classify each chant slug as Haiku-safe (simple formulaic content) or
// Sonnet-required (complex/philosophical). "unknown" defaults to Sonnet.
const HAIKU_PATTERNS = [
  /ashtottara-sata-nama(vali|-stotram)?/,
  /sahasra-?nama(vali|-stotram)?/,
  /shodasa-?nama/,
  /dwadasa-?nama/,
  /ashta-?nama/,
  /trishati/,
  /-namavali$/,
  /-aarti$/,
  /-aarati$/,
  /ashtakam?$/,
  /panchakam?$/,
  /pancharatn/,
  /satakam?$/,
  /mangalashtakam/,
  /pratah-smaran/,
  /nakshatra-?stot/,
  /dwadasha-jyotirlinga/,
  /gayatri-mantra-japa/,
];
const SONNET_PATTERNS = [
  /bhagavad-?gita/, /bhagawad-?gita/, /bhagavadgita/, /ashtavakra/, /uddhava/,
  /vivekachudamani/, /viveka-chudamani/, /viveka-/,
  /upanishad/, /upanissad/, /brihadaranyaka/, /chhandogya/, /prashnopanishad/,
  /eesavasyopanishad/, /ishopanishad/, /mundaka-/, /mandukya-/,
  /katha-upanishad/, /kena-upanishad/, /taittiriya-/, /aitareya-/,
  /soundarya-lahari/, /ananda-lahari/, /shiva-mahimna/, /shiva-tandava/,
  /lalita-trishati/, /devi-mahatmyam/, /durga-saptasati/, /tantra/,
  /samhita/, /ramayana/, /brahma-samhita/, /guru-gita/, /yoga-sutra/,
  /patanjali-yoga/, /mooka-pancha-sathi/, /satakam-telugu/,
];
function classifyChant(slug: string): "haiku" | "sonnet" {
  const s = slug.toLowerCase();
  for (const p of SONNET_PATTERNS) if (p.test(s)) return "sonnet";
  for (const p of HAIKU_PATTERNS) if (p.test(s)) return "haiku";
  return "sonnet"; // err toward quality
}

type VerseStub = {
  id: number;
  verse_number: number;
  sanskrit: string | null;
  transliteration: string | null;
};
type ChantStub = {
  slug: string;
  title: string;
  deity: string | null;
  verses: VerseStub[];
};

function main() {
  const haikuBatches = Number(process.argv[2] || "25");
  const sonnetBatches = Number(process.argv[3] || "25");

  const db = new Database(DB_PATH, { readonly: true });

  // Find chants where at least one verse is untranslated. Skip chants that are
  // already fully covered and skip chants that are obviously Carnatic pedagogy
  // exercises (geethams, sarali, daatu swaras) — those don't have meanings.
  const chants = db
    .prepare(
      `SELECT c.id, c.slug, c.title, c.deity, c.verse_count,
              (SELECT COUNT(*) FROM verses v
                WHERE v.chant_id = c.id
                  AND (v.meaning IS NULL OR length(v.meaning) = 0)) AS untranslated
       FROM chants c
       WHERE c.slug NOT LIKE 'carnatic-music-%'
       ORDER BY c.deity, c.slug`
    )
    .all() as {
    id: number;
    slug: string;
    title: string;
    deity: string | null;
    verse_count: number;
    untranslated: number;
  }[];

  const needsWork = chants.filter((c) => c.untranslated > 0);
  console.log(
    `${needsWork.length} chants need translation (${chants.length} total, ${chants.length - needsWork.length} already fully covered)`
  );

  // Build chant stubs with untranslated verses
  const stubs: ChantStub[] = [];
  for (const c of needsWork) {
    const verses = db
      .prepare(
        `SELECT id, verse_number, sanskrit, transliteration
         FROM verses
         WHERE chant_id = ?
           AND (meaning IS NULL OR length(meaning) = 0)
         ORDER BY verse_number`
      )
      .all(c.id) as VerseStub[];
    if (verses.length === 0) continue;
    stubs.push({
      slug: c.slug,
      title: c.title,
      deity: c.deity,
      verses,
    });
  }

  const totalVerses = stubs.reduce((s, c) => s + c.verses.length, 0);
  console.log(`Total untranslated verses to ship: ${totalVerses}`);

  // Split by classification
  const haikuStubs = stubs.filter((s) => classifyChant(s.slug) === "haiku");
  const sonnetStubs = stubs.filter((s) => classifyChant(s.slug) === "sonnet");
  const haikuVerses = haikuStubs.reduce((s, c) => s + c.verses.length, 0);
  const sonnetVerses = sonnetStubs.reduce((s, c) => s + c.verses.length, 0);
  console.log(
    `Haiku pool: ${haikuStubs.length} chants / ${haikuVerses} verses`
  );
  console.log(
    `Sonnet pool: ${sonnetStubs.length} chants / ${sonnetVerses} verses`
  );

  function batchify(
    pool: ChantStub[],
    count: number,
    prefix: string
  ): { name: string; count: number; verses: number }[] {
    pool.sort((a, b) => b.verses.length - a.verses.length);
    const buckets: ChantStub[][] = Array.from({ length: count }, () => []);
    const loads = Array(count).fill(0);
    for (const stub of pool) {
      let minIdx = 0;
      for (let i = 1; i < count; i++) {
        if (loads[i] < loads[minIdx]) minIdx = i;
      }
      buckets[minIdx].push(stub);
      loads[minIdx] += stub.verses.length;
    }
    const summary: { name: string; count: number; verses: number }[] = [];
    for (let i = 0; i < count; i++) {
      const fname = `${prefix}-${String(i + 1).padStart(2, "0")}.json`;
      fs.writeFileSync(path.join(OUT_DIR, fname), JSON.stringify(buckets[i], null, 2));
      summary.push({ name: fname, count: buckets[i].length, verses: loads[i] });
    }
    return summary;
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const haikuSummary = batchify(haikuStubs, haikuBatches, "haiku");
  const sonnetSummary = batchify(sonnetStubs, sonnetBatches, "sonnet");

  console.log("\nHaiku batches:");
  for (const b of haikuSummary) console.log(`  ${b.name}: ${b.count} chants, ${b.verses} verses`);
  console.log("\nSonnet batches:");
  for (const b of sonnetSummary) console.log(`  ${b.name}: ${b.count} chants, ${b.verses} verses`);

  console.log(`\nDone. Batches in ${OUT_DIR}`);
}

main();
