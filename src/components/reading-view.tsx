"use client";

import { useState } from "react";
import type { Chant, Verse, WordEntry } from "@/lib/db";
import { TappableVerseLine } from "@/components/word-popover";

type SecondaryScript = "hindi" | "tamil" | "none";

const SCRIPT_LABELS: { key: SecondaryScript; label: string }[] = [
  { key: "none", label: "None" },
  { key: "hindi", label: "हिन्दी" },
  { key: "tamil", label: "தமிழ்" },
];

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
  const [secondaryScript, setSecondaryScript] = useState<SecondaryScript>("none");
  const hasWords = wordMeanings.length > 0;

  return (
    <div className="space-y-5">
      {/* Sticky secondary-script toggle */}
      <div className="flex items-center justify-between gap-3 sticky top-[calc(var(--safe-top,0px)+48px)] sm:top-[57px] z-20 bg-[color:var(--bg)]/95 backdrop-blur-md py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-[color:var(--border)]">
        <div className="flex gap-1 text-[10px] uppercase tracking-[0.15em] text-[color:var(--fg-soft)]">
          {SCRIPT_LABELS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSecondaryScript(s.key)}
              className={`rounded-full px-3 py-1.5 transition-colors font-bold ${
                secondaryScript === s.key
                  ? "bg-[color:var(--accent-warm)] text-white"
                  : "bg-[color:var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {hasWords && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--accent-warm)] font-bold whitespace-nowrap">
            tap a word ↓
          </span>
        )}
      </div>

      <ul className="space-y-5">
        {verses.map((v) => {
          const secondary =
            secondaryScript === "hindi"
              ? v.hindi
              : secondaryScript === "tamil"
                ? v.tamil
                : null;
          return (
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

                {secondary && (
                  <>
                    <hr className="hr-gold my-4 opacity-60" />
                    <div
                      className={`${
                        secondaryScript === "tamil" ? "tamil" : "devanagari"
                      } text-[1.25rem] sm:text-[1.375rem] text-[color:var(--fg-soft)] leading-[1.8] break-words text-center`}
                    >
                      {secondary.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
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
          );
        })}
      </ul>

    </div>
  );
}
