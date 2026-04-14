"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { WordMeaning } from "@/lib/db";

function normalize(s: string): string {
  return s
    .replace(/[\u0964\u0965।॥0-9०-९\s·,.:;!?\-–—"'()[\]{}|]+/g, "")
    .trim()
    .toLowerCase();
}

function buildIndex(words: WordMeaning[]): Map<string, WordMeaning> {
  const map = new Map<string, WordMeaning>();
  for (const w of words) {
    if (w.word_devanagari) map.set(normalize(w.word_devanagari), w);
    if (w.word_iast) map.set(normalize(w.word_iast), w);
    // Also add breakdown entries so sub-words resolve
    for (const b of w.breakdown || []) {
      if (b.devanagari && !map.has(normalize(b.devanagari))) {
        map.set(normalize(b.devanagari), {
          ...w,
          word_devanagari: b.devanagari,
          word_iast: b.iast,
          gloss: b.meaning,
          breakdown: [],
        });
      }
    }
  }
  return map;
}

type Token = { text: string; key: string; isWord: boolean };

/** Split a verse line into tokens preserving punctuation as separate non-word tokens. */
function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  const re = /([^\s।॥\u0964\u0965]+|[\s।॥\u0964\u0965]+)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(line)) !== null) {
    const text = m[0];
    const isWord = /\S/.test(text) && !/^[।॥\u0964\u0965\s]+$/.test(text);
    tokens.push({ text, key: `${i++}`, isWord });
  }
  return tokens;
}

type Props = {
  line: string;
  words: WordMeaning[];
  className?: string;
};

/**
 * Render a verse line with each word tappable. Clicking a word shows a popover
 * with its meaning, if found in the word_meanings index.
 */
export function TappableVerseLine({ line, words, className }: Props) {
  const index = useMemo(() => buildIndex(words), [words]);
  const [active, setActive] = useState<{ key: string; w: WordMeaning } | null>(null);
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  const tokens = tokenize(line);

  useEffect(() => {
    if (!active) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-word-chip]") && !t.closest("[data-word-popover]")) {
        setActive(null);
      }
    };
    document.addEventListener("click", close, { capture: true });
    return () => document.removeEventListener("click", close, { capture: true });
  }, [active]);

  return (
    <span className={className}>
      {tokens.map((t) => {
        if (!t.isWord) return <span key={t.key}>{t.text}</span>;
        const norm = normalize(t.text);
        const meaning = index.get(norm);
        if (!meaning) return <span key={t.key}>{t.text}</span>;
        const isActive = active?.key === t.key;
        return (
          <span key={t.key} className="relative inline-block">
            <span
              data-word-chip
              role="button"
              tabIndex={0}
              className={`word-chip ${isActive ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActive(isActive ? null : { key: t.key, w: meaning });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(isActive ? null : { key: t.key, w: meaning });
                }
              }}
              ref={isActive ? anchorRef : undefined}
            >
              {t.text}
            </span>
            <AnimatePresence>
              {isActive && (
                <motion.span
                  data-word-popover
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute z-40 left-1/2 -translate-x-1/2 top-full mt-1.5 w-max max-w-[min(82vw,22rem)] origin-top rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)] shadow-[0_8px_24px_rgba(30,18,6,0.18)] text-left px-3.5 py-2.5 leading-snug"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Primary: DEVA (IAST): gloss */}
                  <span className="block text-[13px] text-[color:var(--fg)]">
                    <span className="devanagari text-[color:var(--fg)]">{meaning.word_devanagari}</span>
                    {meaning.word_iast && (
                      <>
                        {" "}
                        <span className="iast text-[color:var(--fg-soft)]">({meaning.word_iast})</span>
                      </>
                    )}
                    {meaning.gloss && (
                      <>
                        <span className="text-[color:var(--fg-soft)]">: </span>
                        <span className="text-[color:var(--accent)]">{meaning.gloss}</span>
                      </>
                    )}
                  </span>
                  {/* Sub-word breakdown: DEVA (IAST) = meaning */}
                  {meaning.breakdown && meaning.breakdown.length > 0 && (
                    <span className="block mt-1">
                      {meaning.breakdown.map((b, i) => (
                        <span key={i} className="block text-[12px] text-[color:var(--fg-soft)]">
                          <span className="devanagari text-[color:var(--fg)]">{b.devanagari}</span>
                          {b.iast && (
                            <>
                              {" "}
                              <span className="iast">({b.iast})</span>
                            </>
                          )}
                          {b.meaning && (
                            <>
                              <span> = </span>
                              <span className="text-[color:var(--accent)]">{b.meaning}</span>
                            </>
                          )}
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
