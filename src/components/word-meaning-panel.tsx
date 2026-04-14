"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { WordEntry } from "@/lib/db";

function wordAt(line: string | null | undefined, index: number): string | null {
  if (!line) return null;
  const toks = line.split(/[\s।॥\u0964\u0965\n]+/).filter(Boolean);
  if (index < 0 || index >= toks.length) return null;
  return toks[index];
}

type Props = {
  entry: WordEntry | null;
  wordIndex: number;
  sanskritLine: string | null;
  tamilLine: string | null;
  transliterationLine: string | null;
  onClose: () => void;
};

/**
 * Panel shown below a verse's script lines when a word is tapped.
 * Shows the clicked word in Devanagari + Tamil + IAST (by position),
 * then all known glosses and sub-word breakdowns.
 */
export function WordMeaningPanel({
  entry,
  wordIndex,
  sanskritLine,
  tamilLine,
  transliterationLine,
  onClose,
}: Props) {
  return (
    <AnimatePresence initial={false}>
      {entry && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-4 rounded-xl bg-[color:var(--bg)]/60 border border-[color:var(--border)] p-4 sm:p-5 text-left">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)]">
                  word
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="devanagari text-2xl text-[color:var(--fg)]">
                    {wordAt(sanskritLine, wordIndex) || entry.word_devanagari}
                  </span>
                  {transliterationLine && wordAt(transliterationLine, wordIndex) && (
                    <span className="iast text-base text-[color:var(--fg-soft)]">
                      {wordAt(transliterationLine, wordIndex)}
                    </span>
                  )}
                  {tamilLine && wordAt(tamilLine, wordIndex) && (
                    <span className="tamil text-lg text-[color:var(--fg-soft)]">
                      {wordAt(tamilLine, wordIndex)}
                    </span>
                  )}
                </div>
                {entry.iast_variants.length > 0 &&
                  !entry.iast_variants.some(
                    (v) => v === wordAt(transliterationLine, wordIndex)
                  ) && (
                    <div className="iast text-xs text-[color:var(--fg-soft)] opacity-70">
                      {entry.iast_variants.join(" · ")}
                    </div>
                  )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close meaning"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] border border-[color:var(--border)] bg-[color:var(--surface)]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)]">
                meaning{entry.glosses.length > 1 ? "s" : ""}
              </div>
              <ul className="space-y-2">
                {entry.glosses.map((g, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)] px-3 py-2 text-sm text-[color:var(--fg)]"
                  >
                    <div className="leading-snug">
                      <span className="text-[color:var(--accent)]">{g.gloss}</span>
                    </div>
                    {g.breakdown && g.breakdown.length > 0 && (
                      <div className="mt-1.5 space-y-0.5">
                        {g.breakdown.map((b, j) => (
                          <div
                            key={j}
                            className="text-[12px] text-[color:var(--fg-soft)] leading-snug"
                          >
                            <span className="devanagari text-[color:var(--fg)]">{b.devanagari}</span>
                            {b.iast && (
                              <>
                                {" "}
                                <span className="iast">({b.iast})</span>
                              </>
                            )}
                            {b.meaning && (
                              <>
                                {" "}
                                <span>= </span>
                                <span className="text-[color:var(--accent)]">{b.meaning}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
