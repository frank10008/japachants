#!/usr/bin/env tsx
/**
 * Scrape vignanam.org for Sanskrit stotras across 4 scripts.
 * Usage: tsx scripts/scrape-vignanam.ts [--limit N] [--only slug1,slug2,...] [--fresh]
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import Database from "better-sqlite3";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, "cache");
const DB_PATH = path.join(ROOT, "db", "chants.db");
const SCHEMA_PATH = path.join(ROOT, "db", "schema.sql");
const SITEMAP_URL = "https://vignanam.org/sitemap.xml";
const BASE = "https://vignanam.org";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

const TARGET_LANGS = ["samskritam", "english", "hindi", "tamil"] as const;
type Lang = (typeof TARGET_LANGS)[number];

const DEITY_MAP: { match: RegExp; deity: string; category: string }[] = [
  { match: /(ganesh|ganapati|ganapathi|vinayaka|vighnesh|vakratunda|lambodar)/i, deity: "Ganesha", category: "Ganesha Stotrams" },
  { match: /(hanuman|anjaneya|bajrang|maruti)/i, deity: "Hanuman", category: "Hanuman Stotrams" },
  { match: /(shiva|rudra|shankar|mahadev|nataraja|dakshinamurti|lingashtaka|mrityunjaya|tandava|ardhanari|chandrashekhar|pashupati|nilakanth)/i, deity: "Shiva", category: "Shiva Stotrams" },
  { match: /(krishna|madhusudana|gopala|muralidhara|janardana|kanhaiya|govind|vasudeva|yashoda|radha)/i, deity: "Krishna", category: "Krishna Stotrams" },
  { match: /(rama|raghava|raghu|sita|kodanda|janaki)/i, deity: "Rama", category: "Rama Stotrams" },
  { match: /(vishnu|narayana|venkatesa|venkateshwara|balaji|keshava|madhava|padmanabha|hayagriva|varaha|narasimha|trivikrama|nrisimha|ranganath)/i, deity: "Vishnu", category: "Vishnu Stotrams" },
  { match: /(mahishasura|mardini|durga|kali|chandi|ambika|amba|bhavani|annapurna|mookambika|rajarajeshwari)/i, deity: "Durga", category: "Devi Stotrams" },
  { match: /(lakshmi|kamala|padma|sridevi|mahalakshmi)/i, deity: "Lakshmi", category: "Devi Stotrams" },
  { match: /(saraswati|sharada|vageshwari|bhavani)/i, deity: "Saraswati", category: "Devi Stotrams" },
  { match: /(lalita|tripura|kamakshi|rajarajeshwari|shodashi|bala|meenakshi|akhilandeshwari)/i, deity: "Lalita", category: "Devi Stotrams" },
  { match: /(parvati|uma|gauri|girija|himavati)/i, deity: "Parvati", category: "Devi Stotrams" },
  { match: /(devi|shakti|bhagavati)/i, deity: "Devi", category: "Devi Stotrams" },
  { match: /(subrahmanya|muruga|skanda|kartikeya|kumara|shanmukha|velaayudha)/i, deity: "Subrahmanya", category: "Subrahmanya Stotrams" },
  { match: /(ayyappa|ayyappan|shasta|harihara-putra)/i, deity: "Ayyappa", category: "Ayyappa Stotrams" },
  { match: /dattatreya|datta-stotra/i, deity: "Dattatreya", category: "Dattatreya Stotrams" },
  { match: /(surya|aditya|bhaskara)/i, deity: "Surya", category: "Surya Stotrams" },
  { match: /(sai-baba|shirdi|guru-stotra|guru-gita|dakshinamurti)/i, deity: "Guru", category: "Guru Stotrams" },
  { match: /(upanishad|ashtavakra|isha|kena|katha|prashna|mundaka|mandukya|brahma-sutra|vedanta|viveka)/i, deity: "Vedanta", category: "Upanishads & Gita" },
  { match: /(bhagavad-?gita|gita-chapter|gitopadesha)/i, deity: "Gita", category: "Bhagavad Gita" },
  { match: /(rudram|chamakam|purusha-suktam|narayana-suktam|sri-suktam|durga-suktam|mantra-pushpam|ghanapatham|yagnopavita|sandhya-vandanam|gayatri-mantra)/i, deity: "Vedic", category: "Vedic Chants" },
  { match: /(bhaja-govindam|moha-mudagaram)/i, deity: "Shankara", category: "Shankara Works" },
  { match: /(hari-stuti|vishnu-sahasra|govinda-ashtakam)/i, deity: "Vishnu", category: "Vishnu Stotrams" },
];

function inferDeity(slug: string, title: string): { deity: string; category: string } {
  const hay = `${slug} ${title}`.toLowerCase();
  for (const { match, deity, category } of DEITY_MAP) {
    if (match.test(hay)) return { deity, category };
  }
  return { deity: "Misc", category: "Miscellaneous" };
}

function parseArgs() {
  const args = process.argv.slice(2);
  const limit = Number(args[args.indexOf("--limit") + 1]) || 0;
  const onlyArg = args[args.indexOf("--only") + 1];
  const only = args.includes("--only") && onlyArg ? onlyArg.split(",") : null;
  const fresh = args.includes("--fresh");
  return { limit, only, fresh };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url: string, attempts = 4): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,application/xml,*/*" } });
      if (r.status === 403 || r.status === 404) return r; // don't retry missing
      if (r.ok) return r;
      lastErr = new Error(`HTTP ${r.status}`);
    } catch (e) {
      lastErr = e;
    }
    await sleep(800 * Math.pow(2, i));
  }
  throw lastErr;
}

async function getCached(lang: string, slug: string, fresh: boolean): Promise<string | null> {
  const file = path.join(CACHE_DIR, lang, `${slug}.html`);
  if (!fresh && fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const url = `${BASE}/${lang}/${slug}.html`;
  const r = await fetchWithRetry(url);
  if (!r.ok) return null;
  const html = await r.text();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  await sleep(1000); // 1 req/sec
  return html;
}

async function getSitemap(fresh: boolean): Promise<string[]> {
  const file = path.join(CACHE_DIR, "sitemap.xml");
  let xml: string;
  if (!fresh && fs.existsSync(file)) {
    xml = fs.readFileSync(file, "utf8");
  } else {
    const r = await fetchWithRetry(SITEMAP_URL);
    xml = await r.text();
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(file, xml);
  }
  const locs = [...xml.matchAll(/<loc>\s*([^\s<]+)\s*<\/loc>/g)].map((m) => m[1]);
  const slugs = new Set<string>();
  for (const loc of locs) {
    const m = loc.match(/^english\/(.+)\.html$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

function cleanLine(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;/g, "–")
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/[ \t]+/g, " ")
    .trim();
}

const JUNK_RE = /^(browse\s+related|-{3,}|_{3,}|={3,})/i;

function parseVerses(html: string): { title: string; verses: string[] } {
  const $ = cheerio.load(html);
  const rawTitle = $("title").text();
  const title = rawTitle.split(/ [-|] /)[0].trim();
  const stext = $("#stext");
  const verses: string[] = [];
  stext.find("p").each((_, p) => {
    const $p = $(p);
    $p.find("br").replaceWith("\n");
    const raw = $p.text();
    const lines = raw
      .split("\n")
      .map(cleanLine)
      .filter((l) => l.length > 0);
    if (lines.length === 0) return;
    const joined = lines.join("\n");
    // Skip footer junk and separator-only blocks
    if (JUNK_RE.test(joined) || /^[\-_=•·\s]+$/.test(joined)) return;
    verses.push(joined);
  });
  return { title, verses };
}

type ScrapedChant = {
  slug: string;
  title: string;
  sanskritVerses: string[];
  hindiVerses: string[];
  tamilVerses: string[];
  englishVerses: string[];
};

async function scrapeOne(slug: string, fresh: boolean): Promise<ScrapedChant | null> {
  const pages: Partial<Record<Lang, { title: string; verses: string[] }>> = {};
  for (const lang of TARGET_LANGS) {
    const html = await getCached(lang, slug, fresh);
    if (!html) {
      console.warn(`  ✗ ${slug} [${lang}] missing`);
      return null;
    }
    pages[lang] = parseVerses(html);
  }
  const titleEn = pages.english?.title || pages.samskritam?.title || slug;
  return {
    slug,
    title: titleEn,
    sanskritVerses: pages.samskritam?.verses ?? [],
    hindiVerses: pages.hindi?.verses ?? [],
    tamilVerses: pages.tamil?.verses ?? [],
    englishVerses: pages.english?.verses ?? [],
  };
}

function initDb(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const database = new Database(DB_PATH);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(fs.readFileSync(SCHEMA_PATH, "utf8"));
  return database;
}

function upsertChant(database: Database.Database, c: ScrapedChant) {
  const { deity, category } = inferDeity(c.slug, c.title);
  const maxVerses = Math.max(
    c.sanskritVerses.length,
    c.hindiVerses.length,
    c.tamilVerses.length,
    c.englishVerses.length
  );
  const tx = database.transaction(() => {
    database
      .prepare("DELETE FROM chants WHERE slug = ?")
      .run(c.slug);
    const info = database
      .prepare(
        "INSERT INTO chants (slug, title, category, deity, source_url, verse_count) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(c.slug, c.title, category, deity, `${BASE}/english/${c.slug}.html`, maxVerses);
    const chantId = info.lastInsertRowid as number;
    const insVerse = database.prepare(
      "INSERT INTO verses (chant_id, verse_number, sanskrit, hindi, tamil, transliteration) VALUES (?, ?, ?, ?, ?, ?)"
    );
    for (let i = 0; i < maxVerses; i++) {
      insVerse.run(
        chantId,
        i + 1,
        c.sanskritVerses[i] || null,
        c.hindiVerses[i] || null,
        c.tamilVerses[i] || null,
        c.englishVerses[i] || null
      );
    }
  });
  tx();
}

async function main() {
  const { limit, only, fresh } = parseArgs();
  const database = initDb();

  let slugs: string[];
  if (only) {
    slugs = only;
  } else {
    console.log("Fetching sitemap...");
    slugs = await getSitemap(fresh);
    console.log(`  ${slugs.length} stotras in sitemap`);
  }
  if (limit > 0) slugs = slugs.slice(0, limit);

  console.log(`Scraping ${slugs.length} stotras...`);
  let ok = 0;
  let fail = 0;
  for (const slug of slugs) {
    try {
      const chant = await scrapeOne(slug, fresh);
      if (chant && chant.sanskritVerses.length > 0) {
        upsertChant(database, chant);
        console.log(`  ✓ ${chant.title} (${chant.sanskritVerses.length} verses)`);
        ok++;
      } else {
        fail++;
      }
    } catch (e) {
      console.error(`  ✗ ${slug}:`, e instanceof Error ? e.message : e);
      fail++;
    }
  }
  console.log(`\nDone. ok=${ok} fail=${fail}`);
  const total = (database.prepare("SELECT COUNT(*) as n FROM chants").get() as { n: number }).n;
  const verses = (database.prepare("SELECT COUNT(*) as n FROM verses").get() as { n: number }).n;
  console.log(`DB: ${total} chants, ${verses} verses`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
