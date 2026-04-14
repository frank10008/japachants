#!/usr/bin/env tsx
/**
 * Extract per-verse English meanings from every cached greenmesg stotra HTML
 * and merge them into vignanam's `verses.meaning` column.
 *
 * Source: cache/greenmesg/stotras/<deity>/<slug>.html (162 files cached)
 *
 * Greenmesg embeds per-verse meanings after a "Meaning:" label, with each
 * verse prefixed by <span class='lnum'>N:</span>. We parse these, match the
 * stotra to a vignanam chant by slug/title, and update verses.meaning.
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import Database from "better-sqlite3";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, "cache", "greenmesg", "stotras");
const DB_PATH = path.join(ROOT, "db", "chants.db");

const STOP = new Set([
  "sri", "sree", "shri", "om", "aum", "stotram", "stotra", "stotrams", "stutih",
  "stuti", "kavacham", "kavacha", "ashtakam", "ashtaka", "ashtottara",
  "shatanamavali", "sahasranamam", "sahasranama", "gayatri", "mantram",
  "mantra", "slokah", "sloka", "slokam", "suktam", "sukta", "pancharatnam",
  "pancharatna", "the", "mahakaya",
]);

function normalizeSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
function normalizeTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((t) => t.length > 2 && !STOP.has(t))
    .join("-");
}
function tokens(s: string): Set<string> {
  return new Set(s.split("-").filter((t) => t.length > 2));
}
function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}
function containment(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  let inter = 0;
  for (const t of small) if (big.has(t)) inter++;
  return inter / small.size;
}

type ExtractedVerse = { verse_number: number; meaning: string };
type ExtractedStotra = {
  source: string; // deity/slug
  title: string;
  verses: ExtractedVerse[];
  titleTokens: Set<string>;
  slugTokens: Set<string>;
};

function extractFromHtml(html: string, source: string): ExtractedStotra | null {
  const $ = cheerio.load(html);
  const rawTitle = $("title").text().replace(/\s*-\s*In sanskrit.*$/i, "").trim();
  if (!rawTitle) return null;

  // Find the "Meaning:" block and extract per-verse lnum entries.
  // Greenmesg templates vary; the safe path is: get the full body text,
  // find the first "Meaning:" occurrence, then the next "Note:" or "Click" as the end.
  const body = $("body").html() || "";
  const meaningMatch = body.match(/Meaning:([\s\S]*?)(?:Note:|Click here|Source:|<script|<\/body|$)/i);
  if (!meaningMatch) return null;

  const meaningHtml = meaningMatch[1];
  const $m = cheerio.load(`<div>${meaningHtml}</div>`, null, false);

  // Each <span class='lnum'>N:</span> followed by text until the next lnum or end
  const rawInner = $m("div").html() || "";
  // Split on lnum markers
  const chunks = rawInner.split(/<span[^>]*class=['"]lnum['"][^>]*>([^<]+)<\/span>/i);
  // chunks: [before, label1, text1, label2, text2, ...]
  const verses: ExtractedVerse[] = [];
  for (let i = 1; i < chunks.length; i += 2) {
    const label = chunks[i].trim().replace(/:$/, "");
    const num = parseInt(label, 10);
    if (isNaN(num)) continue;
    const textHtml = chunks[i + 1] || "";
    // Strip tags and clean
    const $t = cheerio.load(`<div>${textHtml}</div>`, null, false);
    let text = $t("div").text().replace(/\s+/g, " ").trim();
    // Truncate at next section-break artifacts
    text = text.replace(/Note:.*$/i, "").replace(/Click here.*$/i, "").trim();
    if (text.length > 0) {
      verses.push({ verse_number: num, meaning: text });
    }
  }

  // If no lnum spans found, try a single prose meaning
  if (verses.length === 0) {
    const $wrap = cheerio.load(`<div>${meaningHtml}</div>`, null, false);
    let text = $wrap("div").text().replace(/\s+/g, " ").trim();
    text = text.replace(/Note:.*$/i, "").replace(/Click here.*$/i, "").trim();
    if (text.length > 8) {
      verses.push({ verse_number: 1, meaning: text });
    }
  }

  if (verses.length === 0) return null;

  const slug = source.split("/")[1] || "";
  return {
    source,
    title: rawTitle,
    verses,
    titleTokens: tokens(normalizeTitle(rawTitle)),
    slugTokens: tokens(normalizeSlug(slug)),
  };
}

function walkHtml(dir: string, out: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtml(full, out);
    else if (name.endsWith(".html") && name !== "_index.html") out.push(full);
  }
}

function main() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  const vignanamChants = db
    .prepare("SELECT id, slug, title FROM chants")
    .all() as { id: number; slug: string; title: string }[];

  const vigIndex = vignanamChants.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    slugTokens: tokens(normalizeSlug(c.slug)),
    titleTokens: tokens(normalizeTitle(c.title)),
  }));

  const files: string[] = [];
  walkHtml(CACHE_DIR, files);
  console.log(`Scanning ${files.length} greenmesg stotra HTMLs...`);

  let extracted = 0;
  let matched = 0;
  let versesUpdated = 0;

  const updateVerse = db.prepare(
    "UPDATE verses SET meaning = ? WHERE chant_id = ? AND verse_number = ?"
  );

  for (const file of files) {
    const source = path
      .relative(CACHE_DIR, file)
      .replace(/\.html$/, "")
      .replace(/\\/g, "/");
    const html = fs.readFileSync(file, "utf8");
    const parsed = extractFromHtml(html, source);
    if (!parsed) continue;
    extracted++;

    // Match against vignanam chants
    let best: { id: number; score: number; slug: string } | null = null;
    for (const v of vigIndex) {
      const sj = jaccard(parsed.slugTokens, v.slugTokens);
      const sc = containment(parsed.slugTokens, v.slugTokens);
      const tj = jaccard(parsed.titleTokens, v.titleTokens);
      const tc = containment(parsed.titleTokens, v.titleTokens);
      const score = Math.max(sj, sc * 0.9, tj, tc * 0.85);
      // Require at least 2 shared slug or title tokens to filter noise
      let inter = 0;
      for (const t of parsed.slugTokens) if (v.slugTokens.has(t)) inter++;
      let interT = 0;
      for (const t of parsed.titleTokens) if (v.titleTokens.has(t)) interT++;
      if (inter < 2 && interT < 2) continue;
      if (score >= 0.45 && (!best || score > best.score)) {
        best = { id: v.id, score, slug: v.slug };
      }
    }

    if (!best) continue;
    matched++;

    // Write meanings to matched chant's verses, but only where no meaning
    // already exists — don't overwrite good data.
    const existing = db
      .prepare("SELECT verse_number, meaning FROM verses WHERE chant_id = ?")
      .all(best.id) as { verse_number: number; meaning: string | null }[];
    const byNum = new Map(existing.map((e) => [e.verse_number, e]));

    for (const v of parsed.verses) {
      const row = byNum.get(v.verse_number);
      if (!row) continue; // greenmesg has a verse number vignanam doesn't
      if (row.meaning && row.meaning.length > 0) continue; // keep existing
      updateVerse.run(v.meaning, best.id, v.verse_number);
      versesUpdated++;
    }
  }

  console.log(`Extracted meanings from ${extracted} stotras, matched ${matched} to vignanam, updated ${versesUpdated} verse rows.`);
  const total = (db.prepare("SELECT COUNT(*) as n FROM verses WHERE meaning IS NOT NULL AND length(meaning) > 0").get() as { n: number }).n;
  console.log(`Total verses with meanings: ${total} / ${(db.prepare("SELECT COUNT(*) as n FROM verses").get() as { n: number }).n}`);
}

main();
