#!/usr/bin/env tsx
/**
 * Export remaining translatable chants into final-NN.json batches.
 * Skips Vedic jata-patha recitation and pure ritual procedure chrome.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB = path.join(process.cwd(), "db", "chants.db");
const OUT = path.join(process.cwd(), "cache", "batches");

const SKIP = [
  /^kyts-.*jata/i,
  /^kyts-.*ghana/i,
  /krishna-yajurveda-taittiriya/i,
  /-patha$/i,
  /pooja-vidhanam/i,
  /puja-vidhanam/i,
  /vratam$/i,
  /sandhya-vandanam/i,
  /^carnatic-music-/i,
];

function shouldSkip(slug: string) {
  return SKIP.some((r) => r.test(slug));
}

const db = new Database(DB, { readonly: true });
const chants = db.prepare(`
  SELECT c.id, c.slug, c.title, c.deity
  FROM chants c
  WHERE EXISTS (SELECT 1 FROM verses v WHERE v.chant_id=c.id AND (v.meaning IS NULL OR v.meaning=''))
  ORDER BY c.id
`).all() as any[];

const kept: any[] = [];
let skipped = 0;
for (const c of chants) {
  if (shouldSkip(c.slug)) { skipped++; continue; }
  const verses = db.prepare(`
    SELECT id, verse_number, sanskrit, transliteration
    FROM verses
    WHERE chant_id=? AND (meaning IS NULL OR meaning='')
    ORDER BY verse_number
  `).all(c.id);
  if (verses.length === 0) continue;
  kept.push({ slug: c.slug, title: c.title, deity: c.deity, verses });
}

const totalVerses = kept.reduce((s, c: any) => s + c.verses.length, 0);
console.log(`Kept: ${kept.length} chants / ${totalVerses} verses`);
console.log(`Skipped: ${skipped} chants (Vedic jata / ritual chrome)`);

// Bin-pack into batches of max 250 verses (sahasranamas are heavy per verse)
const MAX = 250;
kept.sort((a: any, b: any) => b.verses.length - a.verses.length);
const buckets: any[][] = [];
const loads: number[] = [];
for (const c of kept) {
  let idx = -1;
  let best = MAX + 1;
  for (let i = 0; i < buckets.length; i++) {
    if (loads[i] + c.verses.length <= MAX && loads[i] < best) {
      idx = i;
      best = loads[i];
    }
  }
  if (idx === -1) {
    buckets.push([c]);
    loads.push(c.verses.length);
  } else {
    buckets[idx].push(c);
    loads[idx] += c.verses.length;
  }
}

for (let i = 0; i < buckets.length; i++) {
  const name = `final-${String(i+1).padStart(2,"0")}.json`;
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(buckets[i], null, 2));
  console.log(`  ${name}: ${buckets[i].length} chants / ${loads[i]} verses`);
}
console.log(`\nTotal: ${buckets.length} batches, ${totalVerses} verses to translate`);
