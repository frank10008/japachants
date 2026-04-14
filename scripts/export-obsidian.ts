#!/usr/bin/env tsx
/**
 * Export every chant in the DB as a Markdown file for Obsidian.
 *
 * Layout:
 *   obsidian-vault/
 *     README.md                 — index + stats
 *     <Deity>/
 *       <slug>.md               — one file per chant
 *
 * Each chant file has YAML frontmatter (slug, title, deity, verse_count,
 * meaning_count, source_url, tags) and sections: Sanskrit, Transliteration,
 * Hindi (if present), Tamil (if present), per-verse English meanings, and a
 * word glossary (from the per-chant word_meanings table).
 *
 * The vault can be dropped into Obsidian, synced via iCloud/git, edited, and
 * later re-imported back into the DB via a separate script.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "db", "chants.db");
const OUT_DIR = path.join(process.cwd(), "obsidian-vault");

type ChantRow = {
  id: number;
  slug: string;
  title: string;
  deity: string | null;
  category: string | null;
  verse_count: number;
  source_url: string | null;
};
type VerseRow = {
  verse_number: number;
  sanskrit: string | null;
  hindi: string | null;
  tamil: string | null;
  transliteration: string | null;
  meaning: string | null;
};
type WordRow = {
  word_devanagari: string | null;
  word_iast: string | null;
  gloss: string | null;
  breakdown: string;
};

function sanitizeFs(s: string): string {
  return s.replace(/[^\w\s.-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

function escYaml(s: string): string {
  // YAML-safe string — quote if contains special chars
  if (/^[\w .,/()&'"-]*$/.test(s) && !s.includes(":") && !s.includes("#")) {
    return s;
  }
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function main() {
  const db = new Database(DB_PATH, { readonly: true });

  const chants = db
    .prepare("SELECT id, slug, title, deity, category, verse_count, source_url FROM chants ORDER BY deity, title")
    .all() as ChantRow[];

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const byDeity = new Map<string, ChantRow[]>();
  for (const c of chants) {
    const deity = c.deity || "Misc";
    if (!byDeity.has(deity)) byDeity.set(deity, []);
    byDeity.get(deity)!.push(c);
  }

  let totalFiles = 0;
  let totalVersesMeaning = 0;
  let totalVerses = 0;

  for (const [deity, list] of byDeity) {
    const deityDir = path.join(OUT_DIR, sanitizeFs(deity));
    fs.mkdirSync(deityDir, { recursive: true });

    for (const c of list) {
      const verses = db
        .prepare(
          "SELECT verse_number, sanskrit, hindi, tamil, transliteration, meaning FROM verses WHERE chant_id = ? ORDER BY verse_number"
        )
        .all(c.id) as VerseRow[];

      const words = db
        .prepare(
          "SELECT word_devanagari, word_iast, gloss, breakdown FROM word_meanings WHERE chant_id = ? ORDER BY word_order"
        )
        .all(c.id) as WordRow[];

      const meaningCount = verses.filter(
        (v) => v.meaning && v.meaning.trim().length > 0
      ).length;
      const coverage = verses.length > 0 ? Math.round((meaningCount / verses.length) * 100) : 0;

      totalFiles++;
      totalVersesMeaning += meaningCount;
      totalVerses += verses.length;

      const lines: string[] = [];

      // YAML frontmatter
      lines.push("---");
      lines.push(`slug: ${escYaml(c.slug)}`);
      lines.push(`title: ${escYaml(c.title)}`);
      lines.push(`deity: ${escYaml(deity)}`);
      if (c.category) lines.push(`category: ${escYaml(c.category)}`);
      lines.push(`verse_count: ${c.verse_count}`);
      lines.push(`meaning_count: ${meaningCount}`);
      lines.push(`coverage_percent: ${coverage}`);
      if (c.source_url) lines.push(`source_url: ${escYaml(c.source_url)}`);
      lines.push(`tags:`);
      lines.push(`  - chant`);
      lines.push(`  - ${deity.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
      if (c.category) lines.push(`  - ${c.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
      if (coverage === 100) lines.push(`  - fully-translated`);
      else if (coverage > 0) lines.push(`  - partial-translation`);
      else lines.push(`  - untranslated`);
      lines.push("---");
      lines.push("");

      // Title
      lines.push(`# ${c.title}`);
      lines.push("");
      lines.push(`**Deity:** ${deity}  `);
      if (c.category) lines.push(`**Category:** ${c.category}  `);
      lines.push(`**Verses:** ${c.verse_count} · **Translated:** ${meaningCount} (${coverage}%)  `);
      if (c.source_url) lines.push(`**Source:** <${c.source_url}>  `);
      lines.push("");
      lines.push("---");
      lines.push("");

      // Verses
      lines.push("## Verses");
      lines.push("");
      for (const v of verses) {
        lines.push(`### Verse ${v.verse_number}`);
        lines.push("");
        if (v.sanskrit) {
          lines.push("**Sanskrit**");
          lines.push("");
          // Render Devanagari in a code block so it displays monospaced and
          // preserves line breaks; also keeps Obsidian from munging combining marks.
          lines.push("```");
          lines.push(v.sanskrit);
          lines.push("```");
          lines.push("");
        }
        if (v.transliteration) {
          lines.push("**Transliteration**");
          lines.push("");
          lines.push("> " + v.transliteration.split("\n").join("  \n> "));
          lines.push("");
        }
        if (v.hindi && v.hindi !== v.sanskrit) {
          lines.push("**Hindi**");
          lines.push("");
          lines.push("```");
          lines.push(v.hindi);
          lines.push("```");
          lines.push("");
        }
        if (v.tamil) {
          lines.push("**Tamil**");
          lines.push("");
          lines.push("```");
          lines.push(v.tamil);
          lines.push("```");
          lines.push("");
        }
        if (v.meaning && v.meaning.trim().length > 0) {
          lines.push("**Meaning**");
          lines.push("");
          lines.push(v.meaning);
          lines.push("");
        } else {
          lines.push("**Meaning**");
          lines.push("");
          lines.push("*Not yet translated.*");
          lines.push("");
        }
        lines.push("---");
        lines.push("");
      }

      // Word glossary
      if (words.length > 0) {
        lines.push("## Word Glossary");
        lines.push("");
        lines.push("| Devanagari | IAST | Meaning |");
        lines.push("|---|---|---|");
        for (const w of words) {
          let breakdown: { devanagari: string; iast: string; meaning: string }[] = [];
          try {
            breakdown = JSON.parse(w.breakdown || "[]");
          } catch {}
          const dev = (w.word_devanagari || "").replace(/\|/g, "\\|");
          const iast = (w.word_iast || "").replace(/\|/g, "\\|");
          const gloss = (w.gloss || "").replace(/\|/g, "\\|").replace(/\n+/g, " ");
          lines.push(`| ${dev} | ${iast} | ${gloss} |`);
          for (const b of breakdown) {
            if (b.meaning) {
              lines.push(
                `| ${(b.devanagari || "").replace(/\|/g, "\\|")} | ${(b.iast || "").replace(/\|/g, "\\|")} | ${b.meaning.replace(/\|/g, "\\|")} |`
              );
            }
          }
        }
        lines.push("");
      }

      const fname = sanitizeFs(c.slug) + ".md";
      fs.writeFileSync(path.join(deityDir, fname), lines.join("\n"));
    }
  }

  // README index
  const readmeLines: string[] = [];
  readmeLines.push("# Japa Chants — Sanskrit Library");
  readmeLines.push("");
  readmeLines.push(
    `**${totalFiles}** chants · **${totalVerses}** verses · **${totalVersesMeaning}** with English meaning (${Math.round((totalVersesMeaning / totalVerses) * 100)}%)`
  );
  readmeLines.push("");
  readmeLines.push(
    "This vault is exported from `db/chants.db`. Each chant is one markdown file with Sanskrit, IAST transliteration, optional Hindi/Tamil, per-verse English meanings, and a word-by-word glossary. Use Obsidian's Dataview plugin to query by `deity`, `coverage_percent`, `category`, etc."
  );
  readmeLines.push("");
  readmeLines.push("## By Deity");
  readmeLines.push("");
  for (const [deity, list] of [...byDeity].sort(
    (a, b) => b[1].length - a[1].length
  )) {
    readmeLines.push(`- **${deity}** — ${list.length} chants`);
  }
  readmeLines.push("");
  readmeLines.push("## Dataview snippets");
  readmeLines.push("");
  readmeLines.push("````dataview");
  readmeLines.push("TABLE deity, verse_count, coverage_percent");
  readmeLines.push("FROM #chant");
  readmeLines.push('WHERE coverage_percent = 100');
  readmeLines.push("SORT deity, title");
  readmeLines.push("````");
  readmeLines.push("");
  readmeLines.push("## Credits");
  readmeLines.push("");
  readmeLines.push("- Sanskrit text from [vignanam.org](https://vignanam.org)");
  readmeLines.push("- Word-by-word meanings from [greenmesg.org](https://greenmesg.org) where available");
  readmeLines.push("- Public-domain verse translations: Annie Besant (Bhagavad-Gita, 1922), Ralph T. H. Griffith (Rig Veda, 1896), Max Müller (Sacred Books of the East, 1879)");
  readmeLines.push("- Additional verse translations generated fresh by Claude Sonnet/Opus from the provided Sanskrit/IAST");

  fs.writeFileSync(path.join(OUT_DIR, "README.md"), readmeLines.join("\n"));

  console.log(`Wrote ${totalFiles} chant files + README`);
  console.log(`Total: ${totalVerses} verses, ${totalVersesMeaning} with meanings (${Math.round((totalVersesMeaning / totalVerses) * 100)}%)`);
  console.log(`Vault: ${OUT_DIR}`);
  const sizeKb = fs
    .readdirSync(OUT_DIR, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .reduce((sum, e) => sum + fs.statSync(path.join(e.parentPath || OUT_DIR, e.name)).size, 0) / 1024;
  console.log(`Size: ${Math.round(sizeKb)} KB`);
}

main();
