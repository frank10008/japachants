"use client";

import { useEffect, useState } from "react";
import type { Chant, Verse, WordEntry } from "@/lib/db";
import type { ChantingScript, ReadingMode } from "@/lib/counter-store";
import { useCounterStore } from "@/lib/counter-store";
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

function verseTextFor(v: Verse, script: ChantingScript): string | null {
  if (script === "sanskrit") return v.sanskrit;
  if (script === "tamil") return v.tamil;
  return v.transliteration;
}

const SCRIPT_LABEL: Record<ChantingScript, string> = {
  sanskrit: "संस्कृतम्",
  tamil: "தமிழ்",
  iast: "IAST",
};
const SCRIPT_CLASS: Record<ChantingScript, string> = {
  sanskrit: "devanagari",
  tamil: "tamil",
  iast: "iast",
};

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
  const globalMode = useCounterStore((s) => s.settings.readingMode);
  const globalScript = useCounterStore((s) => s.settings.chantingScript);

  // Per-chant override for mode and chanting-script. Initialized from store
  // on mount, re-synced when globals change (until the user overrides).
  const [mode, setMode] = useState<ReadingMode>(globalMode);
  const [script, setScript] = useState<ChantingScript>(globalScript);
  const [overridden, setOverridden] = useState(false);

  useEffect(() => {
    if (!overridden) {
      setMode(globalMode);
      setScript(globalScript);
    }
  }, [globalMode, globalScript, overridden]);

  const hasWords = wordMeanings.length > 0;

  return (
    <div className="space-y-5">
      {/* Inline mode toggle — sticky at top of chant */}
      <div className="sticky top-[calc(var(--safe-top,0px)+48px)] sm:top-[57px] z-20 bg-[color:var(--bg)]/95 backdrop-blur-md py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-[color:var(--border)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-0.5">
            {(["translation", "chanting"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setOverridden(true);
                }}
                className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  mode === m
                    ? "bg-[color:var(--accent-warm)] text-white shadow"
                    : "text-[color:var(--fg-soft)]"
                }`}
              >
                {m === "translation" ? "translation" : "chanting"}
              </button>
            ))}
          </div>
          {mode === "chanting" && (
            <div className="inline-flex gap-1 text-[11px]">
              {(["sanskrit", "tamil", "iast"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setScript(s);
                    setOverridden(true);
                  }}
                  className={`rounded-full px-3 py-1.5 font-bold uppercase tracking-wider transition-colors ${
                    script === s
                      ? "bg-[color:var(--maroon)] text-white"
                      : "bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--fg-soft)]"
                  }`}
                >
                  {SCRIPT_LABEL[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {mode === "translation" && hasWords && (
        <p className="text-center text-[11px] uppercase tracking-[0.15em] font-bold text-[color:var(--accent-warm)]">
          tap any word for its meaning
        </p>
      )}

      <ul className={mode === "chanting" ? "space-y-8" : "space-y-5"}>
        {verses.map((v) => {
          if (mode === "chanting") {
            const text = verseTextFor(v, script);
            if (!text) return null; // skip verses missing the chosen script
            return (
              <li
                key={v.id}
                className="rounded-2xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-[var(--card-shadow)] overflow-hidden"
              >
                <div className="px-4 sm:px-8 md:px-10 pt-7 pb-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[color:var(--accent-warm)] mb-5 text-center">
                    verse {v.verse_number}
                  </div>
                  <VerseLines
                    text={text}
                    className={`${SCRIPT_CLASS[script]} text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] text-[color:var(--fg)] leading-[1.8] break-words text-center`}
                    tappable={false}
                  />
                </div>
              </li>
            );
          }

          // translation mode: full experience
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
