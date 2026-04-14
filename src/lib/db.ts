import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = process.env.JAPA_DB_PATH || path.join(process.cwd(), "db", "chants.db");
const SCHEMA_PATH = path.join(process.cwd(), "db", "schema.sql");

let _db: Database.Database | null = null;

export function db(): Database.Database {
  if (_db) return _db;
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const database = new Database(DB_PATH);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  if (fs.existsSync(SCHEMA_PATH)) {
    database.exec(fs.readFileSync(SCHEMA_PATH, "utf8"));
  }
  _db = database;
  return database;
}

export type Chant = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  deity: string | null;
  source_url: string | null;
  verse_count: number;
};

export type Verse = {
  id: number;
  chant_id: number;
  verse_number: number;
  sanskrit: string | null;
  hindi: string | null;
  tamil: string | null;
  transliteration: string | null;
  meaning: string | null;
};

export type WordMeaning = {
  id: number;
  chant_id: number;
  word_order: number;
  word_devanagari: string | null;
  word_iast: string | null;
  gloss: string | null;
  breakdown: { devanagari: string; iast: string; meaning: string }[];
};

/** Shape used by the reading view: a word with one or more known glosses. */
export type WordEntry = {
  word_devanagari: string;
  iast_variants: string[];
  glosses: {
    gloss: string;
    source: string;
    breakdown: { devanagari: string; iast: string; meaning: string }[];
  }[];
};

export type ChantLink = {
  source: string;
  url: string;
};

export function listChants(): Chant[] {
  return db().prepare("SELECT * FROM chants ORDER BY deity, title").all() as Chant[];
}

export function getChantBySlug(slug: string): Chant | undefined {
  return db().prepare("SELECT * FROM chants WHERE slug = ?").get(slug) as Chant | undefined;
}

export function getVerses(chantId: number): Verse[] {
  return db()
    .prepare("SELECT * FROM verses WHERE chant_id = ? ORDER BY verse_number")
    .all(chantId) as Verse[];
}

function tableExists(name: string): boolean {
  try {
    const r = db()
      .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?")
      .get(name);
    return !!r;
  } catch {
    return false;
  }
}

function normalizeDev(s: string): string {
  return s
    .replace(/[\u0951\u0952\u0953\u0954\u1CD0-\u1CE8\u0964\u0965।॥0-9०-९\s·,.:;!?\-–—"'()[\]{}|]+/g, "")
    .trim();
}
function normalizeIast(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, "")
    .replace(/(.)\1+/g, "$1");
}
function normalizeToken(s: string): string {
  if (/[\u0900-\u097F]/.test(s)) return normalizeDev(s);
  return normalizeIast(s);
}
/** Kept for back-compat with per-chant word_meanings lookup */
function normalizeWord(s: string): string {
  return normalizeDev(s);
}

export function getWordMeanings(chantId: number): WordMeaning[] {
  if (!tableExists("word_meanings")) return [];
  const rows = db()
    .prepare("SELECT id, chant_id, word_order, word_devanagari, word_iast, gloss, breakdown FROM word_meanings WHERE chant_id = ? ORDER BY word_order")
    .all(chantId) as (Omit<WordMeaning, "breakdown"> & { breakdown: string })[];
  return rows.map((r) => ({
    ...r,
    breakdown: (() => {
      try {
        return JSON.parse(r.breakdown || "[]");
      } catch {
        return [];
      }
    })(),
  }));
}

/**
 * Return word meanings for a chant, merging both the chant-local word_meanings
 * AND global_words entries that match any Devanagari word in this chant's
 * verses. Falls back silently if global_words doesn't exist.
 */
export function getWordMeaningsForChant(chantId: number, verses: Verse[]): WordEntry[] {
  const entries = new Map<string, WordEntry>();

  // Step 1: chant-local words (higher priority — cited by position/context)
  const local = getWordMeanings(chantId);
  for (const w of local) {
    if (!w.word_devanagari || !w.gloss) continue;
    const norm = normalizeWord(w.word_devanagari);
    if (!norm) continue;
    const existing = entries.get(norm);
    if (existing) {
      if (w.word_iast && !existing.iast_variants.includes(w.word_iast)) {
        existing.iast_variants.push(w.word_iast);
      }
      if (!existing.glosses.some((g) => g.gloss.toLowerCase() === w.gloss!.toLowerCase())) {
        existing.glosses.push({ gloss: w.gloss, source: "", breakdown: w.breakdown || [] });
      }
    } else {
      entries.set(norm, {
        word_devanagari: w.word_devanagari,
        iast_variants: w.word_iast ? [w.word_iast] : [],
        glosses: [{ gloss: w.gloss, source: "", breakdown: w.breakdown || [] }],
      });
    }
    // Also register any sub-words from breakdown as first-class entries
    for (const b of w.breakdown || []) {
      if (!b.devanagari || !b.meaning) continue;
      const subNorm = normalizeWord(b.devanagari);
      if (!subNorm || entries.has(subNorm)) continue;
      entries.set(subNorm, {
        word_devanagari: b.devanagari,
        iast_variants: b.iast ? [b.iast] : [],
        glosses: [{ gloss: b.meaning, source: "", breakdown: [] }],
      });
    }
  }

  // Step 2: collect unique lookup keys from BOTH Sanskrit and transliteration
  // lines. Sanskrit words get a Devanagari key; transliteration words get an
  // aggressive IAST key (diacritics stripped, doubled letters collapsed).
  const versesKeys = new Set<string>();
  for (const v of verses) {
    const pushFrom = (text: string | null | undefined) => {
      if (!text) return;
      for (const tok of text.split(/[\s\u0964\u0965।॥\n]+/)) {
        const norm = normalizeToken(tok);
        if (norm) versesKeys.add(norm);
      }
    };
    pushFrom(v.sanskrit);
    pushFrom(v.transliteration);
  }

  // Step 3: one SQL to fetch all matching global_words rows
  if (tableExists("global_words") && versesKeys.size > 0) {
    const keys = [...versesKeys];
    const BATCH = 900; // stay under SQLite's default max variables
    for (let i = 0; i < keys.length; i += BATCH) {
      const batch = keys.slice(i, i + BATCH);
      const placeholders = batch.map(() => "?").join(",");
      const rows = db()
        .prepare(
          `SELECT norm_key, word_devanagari, iast_variants, glosses
           FROM global_words
           WHERE norm_key IN (${placeholders})`
        )
        .all(...batch) as {
        norm_key: string;
        word_devanagari: string;
        iast_variants: string;
        glosses: string;
      }[];
      for (const r of rows) {
        let iastArr: string[] = [];
        let glossArr: WordEntry["glosses"] = [];
        try {
          iastArr = JSON.parse(r.iast_variants);
        } catch {}
        try {
          glossArr = JSON.parse(r.glosses);
        } catch {}
        // Dedup by Devanagari form (primary identity)
        const dedupKey = r.word_devanagari || r.norm_key;
        const existing = entries.get(dedupKey);
        if (existing) {
          for (const ia of iastArr) {
            if (!existing.iast_variants.includes(ia)) existing.iast_variants.push(ia);
          }
          for (const g of glossArr) {
            if (
              !existing.glosses.some(
                (ex) => ex.gloss.toLowerCase() === g.gloss.toLowerCase()
              )
            ) {
              existing.glosses.push(g);
            }
          }
        } else {
          entries.set(dedupKey, {
            word_devanagari: r.word_devanagari,
            iast_variants: iastArr,
            glosses: glossArr,
          });
        }
      }
    }
  }

  return [...entries.values()];
}

export function getChantLinks(chantId: number): ChantLink[] {
  if (!tableExists("chant_links")) return [];
  return db()
    .prepare("SELECT source, url FROM chant_links WHERE chant_id = ?")
    .all(chantId) as ChantLink[];
}

export function globalWordCount(): number {
  if (!tableExists("global_words")) return 0;
  return (db().prepare("SELECT COUNT(*) as n FROM global_words").get() as { n: number }).n;
}

export function listDeities(): { deity: string; count: number }[] {
  return db()
    .prepare("SELECT deity, COUNT(*) as count FROM chants WHERE deity IS NOT NULL GROUP BY deity ORDER BY count DESC")
    .all() as { deity: string; count: number }[];
}

export function searchChants(q: string): Chant[] {
  if (!q.trim()) return listChants().slice(0, 50);
  const sanitized = q.replace(/["']/g, "").split(/\s+/).filter(Boolean).map((t) => `${t}*`).join(" ");
  if (!sanitized) return [];
  try {
    return db()
      .prepare(
        `SELECT chants.* FROM chants
         JOIN chants_fts ON chants.id = chants_fts.rowid
         WHERE chants_fts MATCH ? ORDER BY rank LIMIT 100`
      )
      .all(sanitized) as Chant[];
  } catch {
    return db()
      .prepare("SELECT * FROM chants WHERE title LIKE ? OR deity LIKE ? ORDER BY title LIMIT 100")
      .all(`%${q}%`, `%${q}%`) as Chant[];
  }
}

/** Lightweight list for client-side live search — everything at once, no verses */
export type ChantListEntry = {
  slug: string;
  title: string;
  deity: string | null;
  category: string | null;
  verse_count: number;
};
export function listChantsForClient(): ChantListEntry[] {
  return db()
    .prepare("SELECT slug, title, deity, category, verse_count FROM chants ORDER BY deity, title")
    .all() as ChantListEntry[];
}
