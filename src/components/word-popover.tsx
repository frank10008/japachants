"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { WordEntry } from "@/lib/db";

function normalize(s: string): string {
  return s
    .replace(/[\u0964\u0965।॥0-9०-९\s·,.:;!?\-–—"'()[\]{}|]+/g, "")
    .trim()
    .toLowerCase();
}

function buildIndex(words: WordEntry[]): Map<string, WordEntry> {
  const map = new Map<string, WordEntry>();
  for (const w of words) {
    const k = normalize(w.word_devanagari);
    if (k) map.set(k, w);
  }
  return map;
}

type Token = { text: string; key: string; isWord: boolean };

function tokenize(line: string): Token[] {
  const out: Token[] = [];
  const re = /([^\s।॥\u0964\u0965]+|[\s।॥\u0964\u0965]+)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(line)) !== null) {
    const text = m[0];
    const isWord = /\S/.test(text) && !/^[।॥\u0964\u0965\s]+$/.test(text);
    out.push({ text, key: `t${i++}`, isWord });
  }
  return out;
}

type Props = {
  line: string;
  words: WordEntry[];
  className?: string;
};

/**
 * Verse line with tappable words. Each matched word triggers a compact
 * floating tooltip in the greenmesg style:
 *
 *   DEVA (IAST): gloss
 *   sub (iast) = meaning
 *   sub (iast) = meaning
 *
 * Multiple glosses are concatenated with " · " so the popup stays short.
 */
export function TappableVerseLine({ line, words, className }: Props) {
  const index = useMemo(() => buildIndex(words), [words]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!activeKey) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-word-chip]") && !t.closest("[data-word-popover]")) {
        setActiveKey(null);
      }
    };
    document.addEventListener("click", close, { capture: true });
    return () => document.removeEventListener("click", close, { capture: true });
  }, [activeKey]);

  const tokens = tokenize(line);

  return (
    <span className={className}>
      {tokens.map((t) => {
        if (!t.isWord) return <span key={t.key}>{t.text}</span>;
        const norm = normalize(t.text);
        const entry = norm ? index.get(norm) : undefined;
        if (!entry) return <span key={t.key}>{t.text}</span>;
        const isActive = activeKey === t.key;
        return (
          <span key={t.key} className="relative inline-block">
            <span
              data-word-chip
              role="button"
              tabIndex={0}
              className={`word-chip ${isActive ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveKey(isActive ? null : t.key);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveKey(isActive ? null : t.key);
                }
              }}
            >
              {t.text}
            </span>
            <AnimatePresence>
              {isActive && (
                <motion.span
                  data-word-popover
                  initial={{ opacity: 0, y: 3, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute z-40 left-1/2 -translate-x-1/2 top-full mt-1.5 w-max max-w-[min(82vw,22rem)] origin-top rounded-lg bg-[color:var(--surface)] border border-[color:var(--accent)] shadow-[0_8px_24px_rgba(30,18,6,0.18)] text-left px-3.5 py-2.5 leading-snug"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Primary line: DEVA (IAST): gloss */}
                  <span className="block text-[13px] text-[color:var(--fg)]">
                    <span className="devanagari text-[color:var(--fg)]">{entry.word_devanagari}</span>
                    {entry.iast_variants.length > 0 && (
                      <>
                        {" "}
                        <span className="text-[color:var(--fg-soft)]">
                          ({entry.iast_variants[0]})
                        </span>
                      </>
                    )}
                    {entry.glosses[0]?.gloss && (
                      <>
                        <span className="text-[color:var(--fg-soft)]">: </span>
                        <span className="text-[color:var(--accent-warm)]">
                          {entry.glosses[0].gloss}
                        </span>
                      </>
                    )}
                  </span>
                  {/* Sub-words from the first gloss's breakdown */}
                  {entry.glosses[0]?.breakdown && entry.glosses[0].breakdown.length > 0 && (
                    <span className="block mt-1">
                      {entry.glosses[0].breakdown.map((b, i) => (
                        <span key={i} className="block text-[12px] text-[color:var(--fg-soft)]">
                          <span className="devanagari text-[color:var(--fg)]">{b.devanagari}</span>
                          {b.iast && <> <span>({b.iast})</span></>}
                          {b.meaning && (
                            <>
                              {" "}
                              <span>= </span>
                              <span className="text-[color:var(--accent-warm)]">{b.meaning}</span>
                            </>
                          )}
                        </span>
                      ))}
                    </span>
                  )}
                  {/* Additional glosses from other chants */}
                  {entry.glosses.length > 1 && (
                    <span className="block mt-1.5 pt-1.5 border-t border-[color:var(--border)] text-[11px] text-[color:var(--fg-soft)]">
                      also:{" "}
                      {entry.glosses.slice(1).map((g, i) => (
                        <span key={i}>
                          {i > 0 && " · "}
                          <span className="text-[color:var(--accent-warm)]">{g.gloss}</span>
                        </span>
                      ))}
                    </span>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}
