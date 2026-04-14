"use client";

import type { WordEntry } from "@/lib/db";

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
function normalize(s: string): string {
  if (/[\u0900-\u097F]/.test(s)) return normalizeDev(s);
  return normalizeIast(s);
}

function buildIndex(words: WordEntry[]): Map<string, WordEntry> {
  const map = new Map<string, WordEntry>();
  for (const w of words) {
    const kd = normalizeDev(w.word_devanagari);
    if (kd) map.set(kd, w);
    for (const iast of w.iast_variants) {
      const ki = normalizeIast(iast);
      if (ki && !map.has(ki)) map.set(ki, w);
    }
  }
  return map;
}

type Props = {
  sanskrit: string | null;
  words: WordEntry[];
};

type Hit = {
  word: string;
  entry: WordEntry;
  key: string;
};

/**
 * Word-by-word table showing every matched Sanskrit word in the verse with
 * all of its known glosses. Always rendered when there are at least 2 hits.
 * Acts as both an expanded "tap-to-reveal" equivalent and a compositional
 * fallback for verses that have no sentence-level meaning yet.
 */
export function WordByWordTable({ sanskrit, words }: Props) {
  if (!sanskrit || words.length === 0) return null;

  const index = buildIndex(words);
  const tokens = sanskrit.split(/[\s\u0964\u0965।॥\n]+/).filter(Boolean);
  const hits: Hit[] = [];
  const seenKeys = new Set<string>();

  for (const tok of tokens) {
    const norm = normalize(tok);
    if (!norm) continue;
    const entry = index.get(norm);
    if (!entry || entry.glosses.length === 0) continue;
    // Dedup by normalized word so repeated tokens don't clutter
    if (seenKeys.has(norm)) continue;
    seenKeys.add(norm);
    hits.push({ word: tok, entry, key: norm });
  }

  if (hits.length < 2) return null;

  return (
    <div className="mt-4">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[color:var(--accent-warm)] mb-2">
        word by word
      </div>
      <ul className="space-y-2">
        {hits.map((h) => {
          const e = h.entry;
          const iast = e.iast_variants[0] || "";
          // Collect all distinct gloss strings for display
          const glosses = e.glosses.map((g) => g.gloss).filter(Boolean);
          return (
            <li
              key={h.key}
              className="flex flex-col sm:flex-row sm:items-baseline gap-x-3 gap-y-0.5 rounded-md bg-[color:var(--bg)]/60 border border-[color:var(--border)] px-3 py-2"
            >
              <div className="shrink-0 sm:w-28 sm:text-right">
                <span className="devanagari text-[1.15rem] text-[color:var(--fg)]">
                  {h.word}
                </span>
                {iast && (
                  <div className="text-[11px] text-[color:var(--fg-soft)] leading-tight">
                    {iast}
                  </div>
                )}
              </div>
              <div className="flex-1 text-[14px] text-[color:var(--fg)] leading-snug">
                {glosses.map((g, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <span className="text-[color:var(--fg-soft)] mx-1.5">·</span>
                    )}
                    <span className="text-[color:var(--accent-warm)]">{g}</span>
                  </span>
                ))}
                {e.glosses[0]?.breakdown && e.glosses[0].breakdown.length > 0 && (
                  <div className="mt-1 text-[11px] text-[color:var(--fg-soft)]">
                    {e.glosses[0].breakdown.map((b, i) => (
                      <span key={i}>
                        {i > 0 && <span className="opacity-50"> · </span>}
                        <span className="devanagari text-[color:var(--fg)]">
                          {b.devanagari}
                        </span>
                        {b.iast && <span className="opacity-70"> ({b.iast})</span>}
                        {b.meaning && <span className="opacity-80"> = {b.meaning}</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
