"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import type { ChantListEntry } from "@/lib/db";

function firstDevanagariChar(title: string): string {
  // quick heuristic for a decorative preview glyph — use first English letter in Devanagari-ish style
  // since we don't have actual Devanagari titles for every chant, use the first char of the title
  return title.slice(0, 1).toUpperCase();
}

export function LibraryBrowser({
  chants,
  deities,
}: {
  chants: ChantListEntry[];
  deities: { deity: string; count: number }[];
}) {
  const [q, setQ] = useState("");
  const [deity, setDeity] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    let list = chants;
    if (deity) list = list.filter((c) => c.deity === deity);
    const query = q.trim().toLowerCase();
    if (query) {
      const terms = query.split(/\s+/);
      list = list.filter((c) => {
        const hay = `${c.title} ${c.deity ?? ""} ${c.slug} ${c.category ?? ""}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      });
    }
    return list;
  }, [chants, deity, q]);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--accent-warm)]">
          the library
        </p>
        <h1 className="display text-3xl sm:text-4xl text-[color:var(--fg)]">Chants</h1>
        <p className="text-xs text-[color:var(--fg-soft)]">
          {filtered.length} of {chants.length}
          {deity ? ` · ${deity}` : ""}
          {q ? ` · "${q}"` : ""}
        </p>
      </header>

      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search stotras, deities, keywords…"
          className="w-full rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] pl-11 pr-10 py-3 text-sm text-[color:var(--fg)] outline-none focus:border-[color:var(--accent)] transition-colors"
        />
        <span
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--fg-soft)]"
        >
          ⌕
        </span>
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] bg-[color:var(--bg)]"
          >
            ✕
          </button>
        )}
      </div>

      <nav
        aria-label="Deity filter"
        className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scroll-px-4 snap-x"
      >
        <button
          type="button"
          onClick={() => setDeity(null)}
          className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs transition-colors ${
            !deity
              ? "bg-[color:var(--maroon)] text-white"
              : "bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--fg-soft)]"
          }`}
        >
          All
        </button>
        {deities.map((d) => (
          <button
            key={d.deity}
            type="button"
            onClick={() => setDeity(d.deity)}
            className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs transition-colors ${
              deity === d.deity
                ? "bg-[color:var(--maroon)] text-white"
                : "bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--fg-soft)]"
            }`}
          >
            {d.deity}{" "}
            <span className={deity === d.deity ? "opacity-80" : "opacity-60"}>
              {d.count}
            </span>
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="devanagari text-6xl text-[color:var(--border)] mb-3">ॐ</div>
          <p className="text-[color:var(--fg-soft)]">No chants found.</p>
          {(q || deity) && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setDeity(null);
              }}
              className="mt-3 text-xs text-[color:var(--accent)] underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.slice(0, 500).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chant/${c.slug}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent)] transition-colors"
              >
                <span
                  aria-hidden
                  className="display text-2xl text-[color:var(--accent-warm)] opacity-50 shrink-0 w-8 text-center"
                >
                  {firstDevanagariChar(c.title)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="display text-base sm:text-lg text-[color:var(--fg)] leading-tight truncate">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-[color:var(--fg-soft)] mt-0.5">
                    {c.deity} · {c.verse_count} {c.verse_count === 1 ? "verse" : "verses"}
                  </div>
                </div>
                <span className="text-[color:var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > 500 && (
        <p className="text-center text-xs text-[color:var(--fg-soft)]">
          Showing the first 500 matches. Narrow your search to see more.
        </p>
      )}
    </div>
  );
}
