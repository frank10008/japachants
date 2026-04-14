#!/usr/bin/env tsx
/**
 * Scrape greenmesg.org for word-by-word meanings of Sanskrit stotras.
 *
 * For each stotra on greenmesg:
 *   - Fetch /stotras/<deity>/<slug>.php to extract verse-level meaning
 *   - Fetch /dictionary/stotras/<deity>/<slug>.txt for word-level tooltip data
 *
 * Then match these to vignanam chants (by fuzzy slug compare) and populate:
 *   - verses.meaning (verse-level English meaning)
 *   - word_meanings (word-level popups)
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import Database from "better-sqlite3";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, "cache", "greenmesg");
const DB_PATH = path.join(ROOT, "db", "chants.db");
const BASE = "https://greenmesg.org";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

async function fetchText(url: string, attempts = 3): Promise<string | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 404 || r.status === 403) return null;
      if (r.ok) return r.text();
    } catch {}
    await new Promise((r) => setTimeout(r, 500 * Math.pow(2, i)));
  }
  return null;
}

async function fetchCached(url: string, cacheKey: string, fresh = false): Promise<string | null> {
  const file = path.join(CACHE_DIR, cacheKey);
  if (!fresh && fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const html = await fetchText(url);
  if (html == null) return null;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  await new Promise((r) => setTimeout(r, 500));
  return html;
}

async function listDeityStotras(deity: string): Promise<string[]> {
  const html = await fetchCached(`${BASE}/stotras/${deity}`, `stotras/${deity}/_index.html`);
  if (!html) return [];
  const $ = cheerio.load(html);
  const slugs = new Set<string>();
  $(`a[href*="/stotras/${deity}/"]`).each((_, a) => {
    const href = $(a).attr("href") || "";
    const m = href.match(new RegExp(`/stotras/${deity}/([a-z0-9_-]+)\\.php`));
    if (m) slugs.add(m[1]);
  });
  return [...slugs];
}

// Strip HTML from a greenmesg meaning entry while preserving readable structure
function stripHtml(s: string): string {
  const $ = cheerio.load(`<div>${s}</div>`, null, false);
  return $.root()
    .text()
    .replace(/\s+/g, " ")
    .trim();
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

type ParsedWord = {
  word_id: string;
  devanagari: string;
  iast: string;
  gloss: string; // the main English meaning phrase
  breakdown: { devanagari: string; iast: string; meaning: string }[]; // sub-word entries
};

function parseDictLine(line: string): ParsedWord | null {
  const idx = line.indexOf("__");
  if (idx === -1) return null;
  const word_id = line.slice(0, idx).trim();
  const htmlEntry = decodeEntities(line.slice(idx + 2));

  const $ = cheerio.load(`<div>${htmlEntry}</div>`, null, false);
  const $root = $("div").first();

  const mword = $root.find(".mword").first().text().trim();
  const trans1 = $root.find(".trans1").first().text().trim();

  // Main gloss: everything between the trans1 close and the first <br/>
  // Easiest: take the full text, strip the mword/trans1 label prefix
  const fullText = $root.text();
  // Format: "{mword} ({trans1}): {gloss}  {mng} ({trans2}) = meaning  ..."
  // Split on "): " — the gloss is up until the first <br/>
  let gloss = "";
  const colonIdx = fullText.indexOf("): ");
  if (colonIdx !== -1) {
    // find the next "  " (double space) or the first sub-entry pattern — simpler: take up to the first occurrence of " = " with a preceding span mng
    const rest = fullText.slice(colonIdx + 3);
    // Gloss ends where breakdown starts; breakdown entries always have a "=" pattern with the parenthesized trans2
    const breakdownStartMatch = rest.match(/[\u0900-\u097F]+ \([^)]+\) = /);
    gloss = breakdownStartMatch ? rest.slice(0, breakdownStartMatch.index).trim() : rest.trim();
    gloss = gloss.replace(/\s+/g, " ").trim();
  }

  const breakdown: { devanagari: string; iast: string; meaning: string }[] = [];
  const mngs = $root.find(".mng").toArray();
  for (const m of mngs) {
    const $m = $(m);
    const dev = $m.text().trim();
    // The .trans2 sibling is the next .trans2 AFTER this .mng
    let iast = "";
    let meaning = "";
    const next = $m.next();
    if (next && next.hasClass && next.hasClass("trans2")) {
      iast = next.text().trim();
    } else {
      // walk forward to find next .trans2
      const sibs = $m.nextAll(".trans2");
      if (sibs.length) iast = $(sibs[0]).text().trim();
    }
    // meaning = text after the " = " up to next .mng or end
    // simpler: parse the text around this node
    breakdown.push({ devanagari: dev, iast, meaning });
  }

  return {
    word_id,
    devanagari: mword || "",
    iast: trans1 || "",
    gloss: gloss || fullText.slice(0, 200).trim(),
    breakdown,
  };
}

function parseDict(txt: string): ParsedWord[] {
  return txt
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map(parseDictLine)
    .filter((w): w is ParsedWord => w !== null);
}

type ParsedStotra = {
  deity: string;
  slug: string;
  title: string;
  verse_meaning: string;
  words: ParsedWord[];
};

async function scrapeStotra(deity: string, slug: string): Promise<ParsedStotra | null> {
  const html = await fetchCached(`${BASE}/stotras/${deity}/${slug}.php`, `stotras/${deity}/${slug}.html`);
  if (!html) return null;
  const dict = await fetchCached(
    `${BASE}/dictionary/stotras/${deity}/${slug}.txt`,
    `dictionary/stotras/${deity}/${slug}.txt`
  );

  const $ = cheerio.load(html);
  const rawTitle = $("title").text().replace(/- In sanskrit with meaning.*$/i, "").trim();
  // Extract verse-level meaning: look for "Meaning:" label followed by text
  const bodyText = $("body").text();
  let verseMeaning = "";
  const m = bodyText.match(/Meaning:([\s\S]*?)(?:Note:|Click|Source|$)/);
  if (m) {
    verseMeaning = m[1]
      .replace(/\s+/g, " ")
      .replace(/\s?\d+:\s?/g, " | ") // strip "1:" "2:" labels
      .trim();
    // truncate at 2000 chars as a safety cap
    if (verseMeaning.length > 2000) verseMeaning = verseMeaning.slice(0, 2000) + "…";
  }

  const words = dict ? parseDict(dict) : [];
  return { deity, slug, title: rawTitle, verse_meaning: verseMeaning, words };
}

// Manual overrides for famous chants where slug spellings diverge
// Maps greenmesg path (deity/slug) → vignanam slug
const MANUAL_MATCHES: Record<string, string> = {
  "surya/aditya_hridayam": "aditya-hrudayam",
  "ganesha/ganapati_atharvashirsha": "ganapathi-upanishat",
  "ganesha/ganesha_pancharatnam": "sree-maha-ganesha-pancharatnam",
  "ganesha/ganesha_aarti": "shri-ganesh-aarati",
  "ganesha/sankata_nashak_ganesh_stotra": "sankata-nashana-ganesha-stotram",
  "ganesha/ashtavinayaka": "ashtavinayaka-stotram",
  "hanuman/atulita_bala_dhamam": "atulita-bala-dhamam",
  "hanuman/twelve_names_of_hanuman": "hanuman-dwadasa-namavali",
  "hanuman/manojavam_marutatulyavegam": "hanuman-dhyanam",
  "lakshmi/kanakadhara_stotram": "kanakadhara-stotram",
  "lakshmi/mahalakshmi_ashtakam": "sri-mahalakshmi-ashtakam",
  "lalita/lalita_panchakam": "lalita-panchakam",
  "vishnu/ranganathashtakam": "sri-ranganatha-ashtakam",
  "vishnu/shantakaram_bhujagashayanam": "shaantaakaaram-bhujagashayanam",
  "vishnu/venkatesa_suprabhatam": "sri-venkatesa-suprabhatam",
  "shiva/shivashtakam": "sri-shivashtakam",
  "shiva/shiva_manasa_puja": "shiva-manasa-puja",
  "shiva/mahamrityunjaya_mantra": "maha-mruthyunjaya-mantra",
  "shiva/dakshinamurti_stotram": "sri-dakshinamurti-stotram",
  "shiva/totakashtakam": "totakaashtakam",
  "shiva/kalabhairavashtakam": "shri-kala-bhairava-ashtakam",
  "shiva/shiva_panchakshara_stotram": "shri-shiva-panchakshara-stotram",
  "rama/sri_rama_raksha_stotram": "rama-raksha-stotram",
  "rama/sri_ramacandra_krpalu": "shri-ramachandra-kripalu",
  "krishna/madhurashtakam": "madhurashtakam",
  "krishna/achyutashtakam": "achyutashtakam",
  "krishna/krishna_ashtakam": "krishnashtakam",
  "krishna/govinda_damodara_stotram": "govinda-damodara-stotram",
  "durga/durga_ashtottara_sata_namavali": "durga-ashtottara-sata-namaavali",
  "durga/devi_aparadha_kshamapana_stotram": "devi-aparadha-kshamapana-stotram",
  "devi/soundarya_lahari": "soundarya-lahari",
  "gayatri/gayatri_mantra_japa": "gayatri-mantra-japa",
};

const STOP = new Set([
  "sri", "sree", "shri", "om", "aum", "stotram", "stotra", "stotrams", "stutih",
  "stuti", "kavacham", "kavacha", "ashtakam", "ashtaka", "ashtottara",
  "shatanamavali", "sahasranamam", "sahasranama", "gayatri", "mantram",
  "mantra", "slokah", "sloka", "slokam", "suktam", "sukta", "pancharatnam",
  "pancharatna", "the", "sree", "shrii",
]);

function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^(sri|sree|shri|sr?i|om|aum)-/, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function tokenSet(s: string): Set<string> {
  return new Set(
    s
      .split("-")
      .filter((t) => t.length > 2 && !STOP.has(t))
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

/** Containment — fraction of smaller set's tokens found in larger set. */
function containment(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  let inter = 0;
  for (const t of small) if (big.has(t)) inter++;
  return inter / small.size;
}

function ensureTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS word_meanings (
      id INTEGER PRIMARY KEY,
      chant_id INTEGER REFERENCES chants(id) ON DELETE CASCADE,
      word_order INTEGER,
      word_devanagari TEXT,
      word_iast TEXT,
      gloss TEXT,
      breakdown TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_wm_chant ON word_meanings(chant_id);
    CREATE TABLE IF NOT EXISTS chant_links (
      id INTEGER PRIMARY KEY,
      chant_id INTEGER REFERENCES chants(id) ON DELETE CASCADE,
      source TEXT,
      url TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_cl_chant ON chant_links(chant_id);
  `);
}

async function main() {
  const deitiesArg = process.argv[2];
  const DEITIES = deitiesArg
    ? deitiesArg.split(",")
    : [
        "ganesha", "shiva", "vishnu", "krishna", "rama", "hanuman", "durga",
        "lakshmi", "saraswati", "lalita", "kali", "surya", "gayatri", "narasimha",
        "varaha", "murugan", "dattatreya", "brahma", "brahman", "vedas", "yoga",
        "ganga", "yamuna", "narmada", "kaveri", "tulasi", "annapoorna",
        "kamakshi", "meenakshi", "tara", "gurudeva", "others",
      ];

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  ensureTables(db);

  // Build index of vignanam chants for matching
  const vignanamChants = db
    .prepare("SELECT id, slug, title FROM chants")
    .all() as { id: number; slug: string; title: string }[];

  const vigIndex = vignanamChants.map((c) => ({
    id: c.id,
    slug: c.slug,
    norm: normalizeForMatch(c.slug),
    tokens: tokenSet(normalizeForMatch(c.slug)),
    title: c.title,
  }));

  let totalScraped = 0;
  let totalMatched = 0;
  let totalWords = 0;

  for (const deity of DEITIES) {
    console.log(`\n=== ${deity} ===`);
    const slugs = await listDeityStotras(deity);
    console.log(`  ${slugs.length} stotras`);

    for (const slug of slugs) {
      const parsed = await scrapeStotra(deity, slug);
      if (!parsed) continue;
      totalScraped++;

      // Match to vignanam: manual override → strict slug jaccard
      const normSlug = normalizeForMatch(slug);
      const slugTokens = tokenSet(normSlug);
      let bestMatch: { id: number; score: number; slug: string } | null = null;

      const manual = MANUAL_MATCHES[`${deity}/${slug}`];
      if (manual) {
        const row = vigIndex.find((v) => v.slug === manual);
        if (row) bestMatch = { id: row.id, score: 1.0, slug: row.slug };
      }

      if (!bestMatch) {
        for (const v of vigIndex) {
          let inter = 0;
          for (const t of slugTokens) if (v.tokens.has(t)) inter++;
          if (inter < 2) continue;
          const j = jaccard(slugTokens, v.tokens);
          const c = containment(slugTokens, v.tokens);
          const score = Math.max(j, c * 0.9);
          if (score >= 0.55 && (!bestMatch || score > bestMatch.score)) {
            bestMatch = { id: v.id, score, slug: v.slug };
          }
        }
      }

      if (bestMatch) {
        totalMatched++;
        // Update the first verse's meaning (greenmesg usually covers just one verse)
        if (parsed.verse_meaning) {
          db.prepare(
            "UPDATE verses SET meaning = COALESCE(meaning, ?) WHERE chant_id = ? AND verse_number = 1"
          ).run(parsed.verse_meaning, bestMatch.id);
        }
        // Insert word meanings
        db.prepare("DELETE FROM word_meanings WHERE chant_id = ?").run(bestMatch.id);
        const insertWord = db.prepare(
          "INSERT INTO word_meanings (chant_id, word_order, word_devanagari, word_iast, gloss, breakdown) VALUES (?, ?, ?, ?, ?, ?)"
        );
        parsed.words.forEach((w, i) => {
          insertWord.run(
            bestMatch!.id,
            i,
            w.devanagari,
            w.iast,
            w.gloss,
            JSON.stringify(w.breakdown)
          );
        });
        totalWords += parsed.words.length;

        // Add chant_links pointer to greenmesg source
        db.prepare("INSERT INTO chant_links (chant_id, source, url) VALUES (?, ?, ?)").run(
          bestMatch.id,
          "greenmesg",
          `${BASE}/stotras/${deity}/${slug}.php`
        );

        console.log(`  ✓ ${slug} → ${bestMatch.slug} (score ${bestMatch.score.toFixed(2)}, ${parsed.words.length} words)`);
      } else {
        console.log(`  ✗ ${slug} (no vignanam match)`);
      }
    }
  }

  console.log(`\nDone. Scraped ${totalScraped} greenmesg stotras, matched ${totalMatched} to vignanam, stored ${totalWords} word meanings.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
