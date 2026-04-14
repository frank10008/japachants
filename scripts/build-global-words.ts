#!/usr/bin/env tsx
/**
 * Build a global Devanagari word → meaning index.
 *
 * Sources (in priority order):
 *   1. All per-chant word_meanings rows in the DB (matched + breakdowns)
 *   2. Every cached greenmesg dictionary file under cache/greenmesg/dictionary
 *      — including stotras that did NOT match a vignanam chant
 *
 * This lets a word known in any stotra (even one we don't ship) light up in
 * every chant that contains it.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as cheerio from "cheerio";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const DICT_ROOT = path.join(process.cwd(), "cache", "greenmesg", "dictionary");

/** Normalize a Devanagari word for lookup: strip punctuation/svara, keep letters. */
function normalizeDev(s: string): string {
  return s
    .replace(/[\u0951\u0952\u0953\u0954\u1CD0-\u1CE8\u0964\u0965।॥0-9०-९\s·,.:;!?\-–—"'()[\]{}|]+/g, "")
    .trim();
}

/** Normalize a Latin/IAST word aggressively:
 *  - decompose + strip combining marks (diacritics: ā→a, ṇ→n, ś→s, ṃ→m)
 *  - lowercase
 *  - collapse doubled letters (aa→a, nn→n) so greenmesg 'Tunndda' matches vignanam 'tundda'
 *  - keep only latin letters
 */
function normalizeIast(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, "")
    .replace(/(.)\1+/g, "$1");
}

/** Dispatch: if the string contains Devanagari letters, use normalizeDev;
 *  otherwise normalizeIast. */
function normalize(s: string): string {
  if (/[\u0900-\u097F]/.test(s)) return normalizeDev(s);
  return normalizeIast(s);
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

type Sub = { devanagari: string; iast: string; meaning: string };
type Gloss = { gloss: string; source: string; breakdown: Sub[] };
type Entry = {
  devanagari: string;
  iast_variants: Set<string>;
  glosses: Gloss[];
};

function cleanGloss(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function addGloss(e: Entry, g: Gloss) {
  const key = g.gloss.toLowerCase().replace(/[\s()[\]]+/g, " ").trim();
  if (!key) return;
  if (
    e.glosses.some(
      (x) => x.gloss.toLowerCase().replace(/[\s()[\]]+/g, " ").trim() === key
    )
  )
    return;
  e.glosses.push(g);
}

function upsert(
  map: Map<string, Entry>,
  devanagari: string,
  iast: string,
  gloss: string,
  source: string,
  breakdown: Sub[]
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

/**
 * Parse a single dict-file line (format: word_id__html_entry).
 * Returns { devanagari, iast, gloss, breakdown }.
 */
function parseDictLine(line: string): {
  devanagari: string;
  iast: string;
  gloss: string;
  breakdown: Sub[];
} | null {
  const idx = line.indexOf("__");
  if (idx === -1) return null;
  const raw = decodeEntities(line.slice(idx + 2));

  const chunks = raw.split(/<br\s*\/?>/i).map((c) => c.trim()).filter(Boolean);
  if (chunks.length === 0) return null;

  // Primary chunk
  const $first = cheerio.load(`<div>${chunks[0]}</div>`, null, false);
  const $firstRoot = $first("div").first();
  const devanagari = $firstRoot.find(".mword").first().text().trim();
  const iast = $firstRoot.find(".trans1").first().text().trim();
  if (!devanagari) return null;

  const firstFull = $firstRoot.text();
  let gloss = "";
  const colonIdx = firstFull.indexOf("): ");
  if (colonIdx !== -1) {
    gloss = firstFull.slice(colonIdx + 3).replace(/\s+/g, " ").trim();
  } else {
    const parenIdx = firstFull.indexOf(")");
    if (parenIdx !== -1)
      gloss = firstFull.slice(parenIdx + 1).replace(/^[:\s]+/, "").trim();
  }

  const breakdown: Sub[] = [];
  for (let i = 1; i < chunks.length; i++) {
    const $c = cheerio.load(`<div>${chunks[i]}</div>`, null, false);
    const $root = $c("div").first();
    const dev = $root.find(".mng").first().text().trim();
    const iastSub = $root.find(".trans2").first().text().trim();
    const fullText = $root.text();
    let meaning = "";
    const eqIdx = fullText.indexOf(" = ");
    if (eqIdx !== -1) {
      meaning = fullText.slice(eqIdx + 3).replace(/\s+/g, " ").trim();
    }
    if (dev || iastSub || meaning) breakdown.push({ devanagari: dev, iast: iastSub, meaning });
  }

  return { devanagari, iast, gloss, breakdown };
}

function walkDictFiles(dir: string, out: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkDictFiles(full, out);
    else if (name.endsWith(".txt")) out.push(full);
  }
}

function main() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    DROP TABLE IF EXISTS global_words;
    CREATE TABLE global_words (
      id INTEGER PRIMARY KEY,
      norm_key TEXT NOT NULL,
      word_devanagari TEXT NOT NULL,
      iast_variants TEXT NOT NULL,
      glosses TEXT NOT NULL
    );
    CREATE INDEX idx_gw_norm ON global_words(norm_key);
  `);

  const entries = new Map<string, Entry>();

  // 1. Existing word_meanings rows (chants matched to vignanam)
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

  for (const r of rows) {
    const breakdown: Sub[] = (() => {
      try {
        return JSON.parse(r.breakdown || "[]");
      } catch {
        return [];
      }
    })();
    if (r.word_devanagari && r.gloss) {
      upsert(entries, r.word_devanagari, r.word_iast || "", r.gloss, r.slug, breakdown);
    }
    for (const b of breakdown) {
      if (b.devanagari && b.meaning) {
        upsert(entries, b.devanagari, b.iast || "", b.meaning, r.slug, []);
      }
    }
  }
  const afterStep1 = entries.size;
  console.log(`After word_meanings: ${afterStep1} unique words`);

  // 2. Every cached greenmesg dict file — including unmatched stotras
  const dictFiles: string[] = [];
  walkDictFiles(DICT_ROOT, dictFiles);
  console.log(`Parsing ${dictFiles.length} cached greenmesg dict files...`);

  let parseFail = 0;
  for (const file of dictFiles) {
    const source = path
      .relative(DICT_ROOT, file)
      .replace(/\.txt$/, "")
      .replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parsed = parseDictLine(trimmed);
      if (!parsed) {
        parseFail++;
        continue;
      }
      if (parsed.devanagari && parsed.gloss) {
        upsert(
          entries,
          parsed.devanagari,
          parsed.iast,
          parsed.gloss,
          source,
          parsed.breakdown
        );
      }
      for (const b of parsed.breakdown) {
        if (b.devanagari && b.meaning) {
          upsert(entries, b.devanagari, b.iast || "", b.meaning, source, []);
        }
      }
    }
  }
  console.log(`After greenmesg dict walk: ${entries.size} unique words (+${entries.size - afterStep1})`);
  if (parseFail > 0) console.log(`  ${parseFail} lines failed to parse`);

  // Write: emit one row per LOOKUP KEY (Devanagari key + each IAST variant key).
  // That way SQL queries can look up either form and find the same entry.
  const insert = db.prepare(
    "INSERT INTO global_words (norm_key, word_devanagari, iast_variants, glosses) VALUES (?, ?, ?, ?)"
  );
  const seenKeys = new Set<string>();
  let rowsWritten = 0;
  const tx = db.transaction(() => {
    for (const [, e] of entries) {
      const iastArr = [...e.iast_variants];
      const glossesJson = JSON.stringify(e.glosses);
      const iastJson = JSON.stringify(iastArr);

      // Primary Devanagari key
      const devKey = normalizeDev(e.devanagari);
      if (devKey && !seenKeys.has(devKey)) {
        seenKeys.add(devKey);
        insert.run(devKey, e.devanagari, iastJson, glossesJson);
        rowsWritten++;
      }
      // Each IAST variant as its own key
      for (const iast of iastArr) {
        const iastKey = normalizeIast(iast);
        if (iastKey && !seenKeys.has(iastKey)) {
          seenKeys.add(iastKey);
          insert.run(iastKey, e.devanagari, iastJson, glossesJson);
          rowsWritten++;
        }
      }
      // Also index sub-word breakdowns (the first-class entries added them, but
      // multi-gloss entries may have breakdowns under secondary glosses too)
      for (const g of e.glosses) {
        for (const b of g.breakdown || []) {
          if (b.devanagari) {
            const k = normalizeDev(b.devanagari);
            if (k && !seenKeys.has(k)) {
              seenKeys.add(k);
              insert.run(
                k,
                b.devanagari,
                JSON.stringify(b.iast ? [b.iast] : []),
                JSON.stringify([{ gloss: b.meaning || "", source: g.source, breakdown: [] }])
              );
              rowsWritten++;
            }
          }
          if (b.iast) {
            const k = normalizeIast(b.iast);
            if (k && !seenKeys.has(k)) {
              seenKeys.add(k);
              insert.run(
                k,
                b.devanagari || "",
                JSON.stringify([b.iast]),
                JSON.stringify([{ gloss: b.meaning || "", source: g.source, breakdown: [] }])
              );
              rowsWritten++;
            }
          }
        }
      }
    }
  });
  tx();

  const totalGlosses = [...entries.values()].reduce((s, e) => s + e.glosses.length, 0);
  console.log(
    `\nglobal_words: ${entries.size} unique entries, ${rowsWritten} index rows, ${totalGlosses} total glosses`
  );
}

main();
