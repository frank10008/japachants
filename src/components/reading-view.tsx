"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Chant, Verse, WordMeaning } from "@/lib/db";
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
  words?: WordMeaning[];
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
  wordMeanings: WordMeaning[];
}) {
  const [secondaryScript, setSecondaryScript] = useState<SecondaryScript>("none");
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set());

  const toggleMeaning = (id: number) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = openIds.size === verses.length;
  const toggleAll = () => setOpenIds(allOpen ? new Set() : new Set(verses.map((v) => v.id)));

  const hasAnyMeaning = verses.some((v) => v.meaning);
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
              className={`rounded-full px-3 py-1.5 transition-colors ${
                secondaryScript === s.key
                  ? "bg-[color:var(--maroon)] text-white"
                  : "bg-[color:var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {hasAnyMeaning && (
          <button
            type="button"
            onClick={toggleAll}
            className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--accent)] whitespace-nowrap"
          >
            {allOpen ? "— all" : "+ meanings"}
          </button>
        )}
      </div>

      {hasWords && (
        <p className="text-center text-[11px] text-[color:var(--fg-soft)] italic">
          Tap any Sanskrit or transliteration word to see its meaning.
        </p>
      )}

      <ul className="space-y-4">
        {verses.map((v) => {
          const isOpen = openIds.has(v.id);
          const secondary =
            secondaryScript === "hindi"
              ? v.hindi
              : secondaryScript === "tamil"
                ? v.tamil
                : null;
          return (
            <li
              key={v.id}
              className="rounded-2xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-[var(--card-shadow)] overflow-hidden"
            >
              <div className="px-4 sm:px-6 md:px-7 pt-5 pb-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)] opacity-80 mb-3">
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
                    <div className="mala-divider my-4">
                      <span className="text-xs">◆</span>
                    </div>
                    <VerseLines
                      text={v.transliteration}
                      className="iast text-[1rem] sm:text-[1.0625rem] text-[color:var(--fg-soft)] leading-[1.7] break-words text-center"
                      words={wordMeanings}
                      tappable={hasWords}
                    />
                  </>
                )}

                {secondary && (
                  <>
                    <div className="mala-divider my-4">
                      <span className="text-[10px]">◆</span>
                    </div>
                    <VerseLines
                      text={secondary}
                      className={`${
                        secondaryScript === "tamil" ? "tamil" : "devanagari"
                      } text-[1.25rem] sm:text-[1.375rem] text-[color:var(--fg-soft)] leading-[1.8] break-words text-center`}
                    />
                  </>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleMeaning(v.id)}
                    className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[color:var(--accent)] hover:text-[color:var(--maroon)] transition-colors"
                    aria-expanded={isOpen}
                  >
                    meaning {isOpen ? "−" : "+"}
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="meaning"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-4 sm:px-6 md:px-7 pb-6 pt-0">
                      <div className="rounded-xl bg-[color:var(--bg)]/60 border border-[color:var(--border)] p-4">
                        {v.meaning ? (
                          <p className="text-[0.9375rem] text-[color:var(--fg)] leading-[1.65]">
                            {v.meaning}
                          </p>
                        ) : (
                          <p className="text-xs italic text-[color:var(--fg-soft)] opacity-70">
                            English meaning not yet available for this verse.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-[calc(var(--safe-bottom,0px)+68px)] sm:bottom-4 pt-3 flex justify-center">
        <Link
          href={`/counter?mantra=${encodeURIComponent(chant.slug)}`}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--maroon)] text-[color:var(--cream)] px-6 py-3 text-sm font-medium shadow-xl shadow-[color:var(--maroon)]/30 hover:-translate-y-0.5 transition-transform"
        >
          <span className="text-[color:var(--accent-warm)]">◆</span>
          Start japa with this mantra
        </Link>
      </div>
    </div>
  );
}
