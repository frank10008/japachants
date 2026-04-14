"use client";

import type { Chant, Verse, WordEntry } from "@/lib/db";
import { TappableVerseLine } from "@/components/word-popover";

function VerseLines({
  text,
  className,
  words,
  tappable,
}: {
  text: string;
  className?: string;
  words?: WordEntry[];
  tappable?: boolean;
}) {
  return (
    <div className={className}>
      {text.split("\n").map((line, i) =>
        tappable && words && words.length > 0 ? (
          <TappableVerseLine key={i} line={line} words={words} className="block" />
        ) : (
          <div key={i}>{line}</div>
        )
      )}
    </div>
  );
}

export function ReadingView({
  chant,
  verses,
  wordMeanings,
}: {
  chant: Chant;
  verses: Verse[];
  wordMeanings: WordEntry[];
}) {
  void chant;
  const hasWords = wordMeanings.length > 0;

  return (
    <div className="space-y-5">
      {hasWords && (
        <p className="text-center text-[11px] uppercase tracking-[0.15em] font-bold text-[color:var(--accent-warm)]">
          tap any word for its meaning
        </p>
      )}

      <ul className="space-y-5">
        {verses.map((v) => (
          <li
            key={v.id}
            className="rounded-2xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-[var(--card-shadow)] overflow-visible"
          >
            <div className="px-4 sm:px-6 md:px-7 pt-5 pb-5">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[color:var(--accent-warm)] mb-3">
                verse {v.verse_number}
              </div>

              {v.sanskrit ? (
                <VerseLines
                  text={v.sanskrit}
                  className="devanagari text-[1.5rem] sm:text-[1.75rem] md:text-[1.875rem] text-[color:var(--fg)] leading-[1.85] break-words text-center"
                  words={wordMeanings}
                  tappable={hasWords}
                />
              ) : (
                <span className="text-sm text-[color:var(--fg-soft)]">(no Sanskrit text)</span>
              )}

              {v.transliteration && (
                <>
                  <hr className="hr-gold my-4 opacity-60" />
                  <VerseLines
                    text={v.transliteration}
                    className="iast text-[1rem] sm:text-[1.0625rem] text-[color:var(--fg)] leading-[1.7] break-words text-center"
                    words={wordMeanings}
                    tappable={hasWords}
                  />
                </>
              )}

              {/* Overall verse meaning */}
              <div className="mt-5 border-t-2 border-[color:var(--accent)] pt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[color:var(--accent-warm)] mb-2">
                  meaning
                </div>
                {v.meaning ? (
                  <p className="text-[15px] text-[color:var(--fg)] leading-[1.65]">
                    {v.meaning}
                  </p>
                ) : (
                  <p className="text-[13px] italic text-[color:var(--fg-soft)] opacity-70">
                    English translation not yet available for this verse — tap any Sanskrit or transliteration word for its meaning.
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
