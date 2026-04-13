"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Chant, Verse } from "@/lib/db";

type Script = "sanskrit" | "hindi" | "tamil" | "transliteration";

const SCRIPT_LABEL: Record<Script, string> = {
  sanskrit: "संस्कृतम्",
  hindi: "हिन्दी",
  tamil: "தமிழ்",
  transliteration: "IAST",
};

const SCRIPT_CLASS: Record<Script, string> = {
  sanskrit: "devanagari",
  hindi: "devanagari",
  tamil: "tamil",
  transliteration: "italic scripted-translation",
};

function verseField(v: Verse, s: Script): string | null {
  if (s === "sanskrit") return v.sanskrit;
  if (s === "hindi") return v.hindi;
  if (s === "tamil") return v.tamil;
  return v.transliteration;
}

function VerseLines({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split("\n").map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

export function ReadingView({ chant, verses }: { chant: Chant; verses: Verse[] }) {
  const [translationScript, setTranslationScript] = useState<Script>("transliteration");
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set());

  const toggle = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = openIds.size === verses.length;
  const toggleAll = () => setOpenIds(allOpen ? new Set() : new Set(verses.map((v) => v.id)));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 sticky top-[calc(var(--safe-top,0px)+48px)] sm:top-[57px] z-20 bg-[color:var(--bg)]/95 backdrop-blur-md py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-[color:var(--border)]">
        <div className="flex gap-1 overflow-x-auto -mx-1 px-1 snap-x">
          {(["hindi", "tamil", "transliteration"] as Script[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTranslationScript(s)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                translationScript === s
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-[color:var(--surface)] text-[color:var(--fg-soft)] border border-[color:var(--border)]"
              }`}
            >
              {SCRIPT_LABEL[s]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] whitespace-nowrap"
        >
          {allOpen ? "collapse all" : "expand all"}
        </button>
      </div>

      <ul className="space-y-4">
        {verses.map((v) => {
          const isOpen = openIds.has(v.id);
          const translation = verseField(v, translationScript);
          return (
            <li
              key={v.id}
              className="rounded-2xl bg-[color:var(--surface)] border border-[color:var(--border)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(v.id)}
                className="w-full text-left p-4 sm:p-6 md:p-7 transition-colors hover:bg-[color:var(--cream-dim)]/30 active:bg-[color:var(--cream-dim)]/50"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4">
                  {v.sanskrit ? (
                    <VerseLines
                      text={v.sanskrit}
                      className="devanagari text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] text-[color:var(--fg)] leading-[1.75] flex-1 break-words"
                    />
                  ) : (
                    <span className="text-sm text-[color:var(--fg-soft)]">(no Sanskrit text)</span>
                  )}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[color:var(--accent-soft)] text-lg shrink-0 mt-1"
                    aria-hidden
                  >
                    ⌄
                  </motion.span>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-4 sm:px-6 md:px-7 pb-5 pt-1 space-y-4 border-t border-[color:var(--border)]">
                      {translation && (
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)] mb-1.5">
                            {SCRIPT_LABEL[translationScript]}
                          </div>
                          <VerseLines
                            text={translation}
                            className={`${SCRIPT_CLASS[translationScript]} text-lg text-[color:var(--fg-soft)]`}
                          />
                        </div>
                      )}
                      {v.transliteration && translationScript !== "transliteration" && (
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)] mb-1.5">
                            IAST
                          </div>
                          <VerseLines
                            text={v.transliteration}
                            className="italic text-sm text-[color:var(--fg-soft)]"
                          />
                        </div>
                      )}
                      {v.meaning ? (
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)] mb-1.5">
                            meaning
                          </div>
                          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{v.meaning}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-[color:var(--fg-soft)] italic opacity-60">
                          meaning not available
                        </p>
                      )}
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
          <span className="text-[color:var(--accent)]">◆</span>
          Start japa with this mantra
        </Link>
      </div>
    </div>
  );
}
