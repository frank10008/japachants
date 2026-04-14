#!/usr/bin/env tsx
/**
 * Classify each untranslated batch by content complexity so we can route
 * namavalis / ashtottara lists / short praise stotras to Haiku and the
 * philosophical / tantric / Upanishadic work to Sonnet.
 *
 * Output: cache/batches/classification.json
 * [{batch: "batch-04.json", tier: "haiku"|"sonnet", reason: "..."}]
 */
import fs from "node:fs";
import path from "node:path";

const BATCH_DIR = path.join(process.cwd(), "cache", "batches");

// Haiku-safe patterns: formulaic, short-verse, name-list oriented
const HAIKU_PATTERNS = [
  /ashtottara-sata-nama(vali|-stotram)?/,
  /sahasra-?nama(vali|-stotram)?/,
  /shodasa-?nama/,
  /dwadasa-?nama/,
  /ashta-?nama/,
  /trishati/,
  /-namavali$/,
  /-aarti$/,
  /-aarati$/,
  /ashtakam?$/,
  /panchakam?$/,
  /pancharatn/,
  /satakam?$/,
  /shodasha/,
  /mangalashtakam/,
  /pratah-smaran/,
  /nakshatra-?stot/,
  /dwadasha-jyotirlinga/,
  /gayatri-mantra-japa/,
];

// Sonnet-only patterns: philosophical, tantric, Upanishadic, long-verse
const SONNET_PATTERNS = [
  /bhagavad-?gita/,
  /bhagawad-?gita/,
  /bhagavadgita/,
  /ashtavakra/,
  /uddhava/,
  /vivekachudamani/,
  /viveka-chudamani/,
  /viveka-/,
  /upanishad/,
  /upanissad/,
  /brihadaranyaka/,
  /chhandogya/,
  /prashnopanishad/,
  /eesavasyopanishad/,
  /ishopanishad/,
  /mundaka-/,
  /mandukya-/,
  /katha-upanishad/,
  /kena-upanishad/,
  /taittiriya-/,
  /aitareya-/,
  /soundarya-lahari/,
  /ananda-lahari/,
  /shiva-mahimna/,
  /shiva-tandava/,
  /lalita-trishati/,
  /devi-mahatmyam/,
  /durga-saptasati/,
  /tantra/,
  /samhita/,
  /ramayana/,
  /brahma-samhita/,
  /guru-gita/,
  /yoga-sutra/,
  /patanjali-yoga/,
];

type Chant = { slug: string; title: string; verses: unknown[] };

function classifyChant(slug: string): "haiku" | "sonnet" | "unknown" {
  const s = slug.toLowerCase();
  for (const p of SONNET_PATTERNS) if (p.test(s)) return "sonnet";
  for (const p of HAIKU_PATTERNS) if (p.test(s)) return "haiku";
  return "unknown";
}

function main() {
  const files = fs
    .readdirSync(BATCH_DIR)
    .filter((f) => /^batch-\d+\.json$/.test(f))
    .sort();

  const results: {
    batch: string;
    tier: "haiku" | "sonnet";
    haiku_pct: number;
    sonnet_pct: number;
    unknown_pct: number;
    sample_slugs: string[];
  }[] = [];

  for (const f of files) {
    const fpath = path.join(BATCH_DIR, f);
    const data = JSON.parse(fs.readFileSync(fpath, "utf8")) as Chant[];

    let haikuChants = 0;
    let sonnetChants = 0;
    let unknownChants = 0;
    let haikuVerses = 0;
    let sonnetVerses = 0;
    let unknownVerses = 0;

    for (const c of data) {
      const k = classifyChant(c.slug);
      const vc = c.verses.length;
      if (k === "haiku") {
        haikuChants++;
        haikuVerses += vc;
      } else if (k === "sonnet") {
        sonnetChants++;
        sonnetVerses += vc;
      } else {
        unknownChants++;
        unknownVerses += vc;
      }
    }

    const totalVerses = haikuVerses + sonnetVerses + unknownVerses;
    const haikuPct = haikuVerses / totalVerses;
    const sonnetPct = sonnetVerses / totalVerses;
    const unknownPct = unknownVerses / totalVerses;

    // Route entire batch: if ≥70% of verses are haiku-safe AND 0 sonnet-only, use Haiku
    let tier: "haiku" | "sonnet" = "sonnet"; // default err toward quality
    if (haikuPct >= 0.7 && sonnetPct === 0) tier = "haiku";

    results.push({
      batch: f,
      tier,
      haiku_pct: Math.round(haikuPct * 100),
      sonnet_pct: Math.round(sonnetPct * 100),
      unknown_pct: Math.round(unknownPct * 100),
      sample_slugs: data.slice(0, 4).map((c) => c.slug),
    });
  }

  fs.writeFileSync(
    path.join(BATCH_DIR, "classification.json"),
    JSON.stringify(results, null, 2)
  );

  const haikuBatches = results.filter((r) => r.tier === "haiku");
  const sonnetBatches = results.filter((r) => r.tier === "sonnet");
  console.log(
    `${results.length} batches classified: ${haikuBatches.length} Haiku, ${sonnetBatches.length} Sonnet`
  );
  for (const r of results) {
    console.log(
      `  ${r.batch}: ${r.tier.padEnd(6)} (h${r.haiku_pct} s${r.sonnet_pct} u${r.unknown_pct}) — ${r.sample_slugs.slice(0, 2).join(", ")}`
    );
  }
}

main();
