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

  // Greenmesg page structure (confirmed by inspection of sankata_nashak_ganesh_stotra.html):
  //
  //   <Sanskrit verse N>
  //   Meaning:<br/>
  //   <span class='lnum'>N.1:</span> English line 1 <br/>
  //   <span class='lnum'>N.2:</span> English line 2 <br/>
  //   <br/><img>…
  //   <span class='Sanskrit'>…verse N+1 Sanskrit…</span>
  //   Meaning:<br/>
  //   <span class='lnum'>(N+1).1:</span> …
  //
  // So the correct extraction: split the WHOLE body on every lnum label, and
  // for each text chunk, cut off at the first thing that marks the end of the
  // English: a next-verse Sanskrit block, an <img>, "Meaning:" label, or
  // "Note:/Click here" footer.

  const body = $("body").html() || "";

  // Split by lnum label spans: chunks = [pre, label1, text1, label2, text2, ...]
  const chunks = body.split(/<span[^>]*class=['"]lnum['"][^>]*>([^<]+)<\/span>/i);
  if (chunks.length < 3) return null;

  // Each chunk must be cut at the first boundary marker
  const BOUNDARY = /<span[^>]*class=['"](?:Sanskrit|SanskritTrans)['"]|<div[^>]*class=['"](?:Sanskrit|SanskritTrans)['"]|<img\b|Meaning:\s*<br|Note:|Click\s+here|<script/i;

  // Aggregate sub-line labels (1.1, 1.2) into a single verse
  const byVerse = new Map<number, string[]>();

  for (let i = 1; i < chunks.length; i += 2) {
    const rawLabel = chunks[i].trim().replace(/:$/, "");
    // Parse "1" or "1.1" or "1.2" — take the integer part as verse number
    const num = parseInt(rawLabel, 10);
    if (isNaN(num)) continue;

    let textHtml = chunks[i + 1] || "";
    // Trim at first boundary marker so we don't leak into the next verse
    const boundaryMatch = textHtml.match(BOUNDARY);
    if (boundaryMatch && boundaryMatch.index !== undefined) {
      textHtml = textHtml.slice(0, boundaryMatch.index);
    }

    // Strip HTML into plain text
    const $t = cheerio.load(`<div>${textHtml}</div>`, null, false);
    let text = $t("div").text().replace(/\s+/g, " ").trim();
    // Belt-and-suspenders: strip any Devanagari that might have leaked
    text = text.replace(/[\u0900-\u097F]+/g, "").replace(/\s+/g, " ").trim();
    // Strip any trailing separator junk
    text = text.replace(/^[\s|.,;:]+|[\s|.,;:]+$/g, "");
    if (text.length < 3) continue;
    // Drop if it obviously contains scraped chrome
    if (/^(note|click|source)/i.test(text)) continue;

    const prior = byVerse.get(num) || [];
    prior.push(text);
    byVerse.set(num, prior);
  }

  const verses: ExtractedVerse[] = [];
  for (const [num, parts] of byVerse) {
    // Join sub-lines with " · " for readability
    const joined = parts.join(" · ");
    // Quality gate: reject absurdly long verses (almost certainly corrupt)
    if (joined.length > 1500) continue;
    verses.push({ verse_number: num, meaning: joined });
  }

  // No-lnum fallback: if the page has a single prose Meaning: block, capture
  // just the first 600 chars as verse 1. Only if we got zero lnum verses.
  if (verses.length === 0) {
    const meaningMatch = body.match(/Meaning:([\s\S]*?)(?:Note:|Click\s+here|<script)/i);
    if (meaningMatch) {
      const $f = cheerio.load(`<div>${meaningMatch[1]}</div>`, null, false);
      let text = $f("div").text().replace(/\s+/g, " ").trim();
      text = text.replace(/[\u0900-\u097F]+/g, "").replace(/\s+/g, " ").trim();
      if (text.length >= 10 && text.length <= 1500) {
        verses.push({ verse_number: 1, meaning: text });
      }
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

      let slugInter = 0;
      for (const t of parsed.slugTokens) if (v.slugTokens.has(t)) slugInter++;
      let titleInter = 0;
      for (const t of parsed.titleTokens) if (v.titleTokens.has(t)) titleInter++;

      // Allow single-token matches ONLY when both sides are single-token and identical
      // (e.g. 'rudrashtakam' <-> 'rudrashtakam'). Otherwise require ≥2 shared tokens.
      const singleTokenExact =
        parsed.slugTokens.size === 1 &&
        v.slugTokens.size === 1 &&
        slugInter === 1;

      if (!singleTokenExact && slugInter < 2 && titleInter < 2) continue;
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
