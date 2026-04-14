"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
    // Index every IAST variant as its own key
    for (const iast of w.iast_variants) {
      const ki = normalizeIast(iast);
      if (ki && !map.has(ki)) map.set(ki, w);
    }
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
                  className="absolute z-40 left-1/2 -translate-x-1/2 top-full mt-2 w-[min(90vw,26rem)] origin-top rounded-xl bg-[color:var(--surface)] border-2 border-[color:var(--accent)] shadow-[0_12px_32px_rgba(0,0,0,0.18)] text-left px-4 py-3.5 leading-relaxed"
                  style={{ maxHeight: "min(70vh, 28rem)", overflowY: "auto" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Primary line: DEVA (IAST): gloss */}
                  <div className="text-[15px] text-[color:var(--fg)]">
                    <span className="devanagari text-[1.3em] text-[color:var(--fg)] font-medium">
                      {entry.word_devanagari}
                    </span>
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
                        <span className="text-[color:var(--accent-warm)] font-medium">
                          {entry.glosses[0].gloss}
                        </span>
                      </>
                    )}
                  </div>
                  {/* Sub-words from the first gloss's breakdown */}
                  {entry.glosses[0]?.breakdown && entry.glosses[0].breakdown.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      {entry.glosses[0].breakdown.map((b, i) => (
                        <div key={i} className="text-[14px] text-[color:var(--fg-soft)]">
                          <span className="devanagari text-[1.15em] text-[color:var(--fg)]">
                            {b.devanagari}
                          </span>
                          {b.iast && <> <span>({b.iast})</span></>}
                          {b.meaning && (
                            <>
                              {" "}
                              <span>= </span>
                              <span className="text-[color:var(--accent-warm)]">{b.meaning}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Additional glosses from other chants */}
                  {entry.glosses.length > 1 && (
                    <div className="mt-3 pt-2.5 border-t-2 border-[color:var(--accent)]/30 text-[13px] text-[color:var(--fg-soft)]">
                      <span className="uppercase tracking-wider text-[11px] font-bold text-[color:var(--accent-warm)]">
                        also:
                      </span>{" "}
                      {entry.glosses.slice(1).map((g, i) => (
                        <span key={i}>
                          {i > 0 && " · "}
                          <span className="text-[color:var(--accent-warm)]">{g.gloss}</span>
                        </span>
                      ))}
                    </div>
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
