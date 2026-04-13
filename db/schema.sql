-- Japa Chants schema
-- One chant (stotra), many verses. One row per verse across all 4 scripts.

CREATE TABLE IF NOT EXISTS chants (
  id         INTEGER PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT NOT NULL,
  category   TEXT,
  deity      TEXT,
  source_url TEXT,
  verse_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS verses (
  id              INTEGER PRIMARY KEY,
  chant_id        INTEGER NOT NULL REFERENCES chants(id) ON DELETE CASCADE,
  verse_number    INTEGER NOT NULL,
  sanskrit        TEXT,
  hindi           TEXT,
  tamil           TEXT,
  transliteration TEXT,
  meaning         TEXT,
  UNIQUE (chant_id, verse_number)
);

CREATE INDEX IF NOT EXISTS idx_verses_chant ON verses(chant_id);
CREATE INDEX IF NOT EXISTS idx_chants_deity ON chants(deity);
CREATE INDEX IF NOT EXISTS idx_chants_category ON chants(category);

-- FTS5 virtual table for search across titles
CREATE VIRTUAL TABLE IF NOT EXISTS chants_fts USING fts5(
  title, deity, slug, content='chants', content_rowid='id'
);

CREATE TRIGGER IF NOT EXISTS chants_fts_ai AFTER INSERT ON chants BEGIN
  INSERT INTO chants_fts(rowid, title, deity, slug) VALUES (new.id, new.title, new.deity, new.slug);
END;
CREATE TRIGGER IF NOT EXISTS chants_fts_ad AFTER DELETE ON chants BEGIN
  INSERT INTO chants_fts(chants_fts, rowid, title, deity, slug) VALUES ('delete', old.id, old.title, old.deity, old.slug);
END;
CREATE TRIGGER IF NOT EXISTS chants_fts_au AFTER UPDATE ON chants BEGIN
  INSERT INTO chants_fts(chants_fts, rowid, title, deity, slug) VALUES ('delete', old.id, old.title, old.deity, old.slug);
  INSERT INTO chants_fts(rowid, title, deity, slug) VALUES (new.id, new.title, new.deity, new.slug);
END;
