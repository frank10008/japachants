"use client";

import { useMemo } from "react";
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

type TokenPart = { text: string; key: string; isWord: boolean; wordIndex: number };

/** Split a verse line into tokens; word tokens get a zero-based word index. */
export function tokenizeLine(line: string): TokenPart[] {
  const out: TokenPart[] = [];
  const re = /([^\s।॥\u0964\u0965]+|[\s।॥\u0964\u0965]+)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  let wordIdx = 0;
  while ((m = re.exec(line)) !== null) {
    const text = m[0];
    const isWord = /\S/.test(text) && !/^[।॥\u0964\u0965\s]+$/.test(text);
    out.push({
      text,
      key: `t${i++}`,
      isWord,
      wordIndex: isWord ? wordIdx++ : -1,
    });
  }
  return out;
}

type Props = {
  line: string;
  words: WordEntry[];
  activeWordIndex: number | null;
  onWordClick: (entry: WordEntry, wordIndex: number) => void;
  className?: string;
};

/**
 * Verse line with tappable words. Each word is a chip that:
 *  - resolves against the provided word index (normalized Devanagari key)
 *  - fires onWordClick with the WordEntry and the word's position in the line
 *  - highlights when `activeWordIndex` matches
 */
export function TappableVerseLine({
  line,
  words,
  activeWordIndex,
  onWordClick,
  className,
}: Props) {
  const index = useMemo(() => buildIndex(words), [words]);
  const tokens = tokenizeLine(line);

  return (
    <span className={className}>
      {tokens.map((t) => {
        if (!t.isWord) return <span key={t.key}>{t.text}</span>;
        const norm = normalize(t.text);
        const meaning = norm ? index.get(norm) : undefined;
        if (!meaning) return <span key={t.key}>{t.text}</span>;
        const isActive = activeWordIndex === t.wordIndex;
        return (
          <span
            key={t.key}
            role="button"
            tabIndex={0}
            data-word-chip
            className={`word-chip ${isActive ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onWordClick(meaning, t.wordIndex);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onWordClick(meaning, t.wordIndex);
              }
            }}
          >
            {t.text}
          </span>
        );
      })}
    </span>
  );
}
