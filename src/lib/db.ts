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
    // FTS may error on weird input; fall back to LIKE
    return db()
      .prepare("SELECT * FROM chants WHERE title LIKE ? OR deity LIKE ? ORDER BY title LIMIT 100")
      .all(`%${q}%`, `%${q}%`) as Chant[];
  }
}
