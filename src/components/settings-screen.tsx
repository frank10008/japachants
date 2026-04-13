"use client";

import { useEffect, useState } from "react";
import { useCounterStore } from "@/lib/counter-store";

const TARGETS = [27, 54, 108, 216, 1008];
const SCRIPTS = [
  { value: "sanskrit", label: "Sanskrit (Devanagari)" },
  { value: "hindi", label: "Hindi (Devanagari)" },
  { value: "tamil", label: "Tamil" },
  { value: "transliteration", label: "Transliteration (IAST)" },
] as const;

export function SettingsScreen() {
  const settings = useCounterStore((s) => s.settings);
  const updateSettings = useCounterStore((s) => s.updateSettings);
  const sessions = useCounterStore((s) => s.sessions);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="text-center py-20 text-[color:var(--fg-soft)]">Loading…</div>
    );
  }

  const totalCount = sessions.reduce((sum, s) => sum + s.count, 0);
  const totalMinutes = Math.floor(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60);

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent-soft)]">settings</p>
        <h1 className="display text-4xl text-[color:var(--fg)] mt-1">Preferences</h1>
      </header>

      <section className="space-y-3">
        <h2 className="display text-lg text-[color:var(--fg)]">Target count</h2>
        <div className="flex flex-wrap gap-2">
          {TARGETS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateSettings({ target: t })}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                settings.target === t
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-[color:var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="display text-lg text-[color:var(--fg)]">Default translation script</h2>
        <div className="flex flex-col gap-2">
          {SCRIPTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => updateSettings({ defaultScript: s.value })}
              className={`text-left rounded-xl px-4 py-3 text-sm transition-colors ${
                settings.defaultScript === s.value
                  ? "bg-[color:var(--accent)]/10 border border-[color:var(--accent)] text-[color:var(--fg)]"
                  : "bg-[color:var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="display text-lg text-[color:var(--fg)]">Haptics</h2>
        <button
          type="button"
          onClick={() => updateSettings({ haptics: !settings.haptics })}
          className="flex items-center justify-between w-full rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-3"
        >
          <span className="text-sm">Vibrate on tap</span>
          <span
            className={`w-11 h-6 rounded-full relative transition-colors ${
              settings.haptics ? "bg-[color:var(--accent)]" : "bg-[color:var(--border)]"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                settings.haptics ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>
      </section>

      <section className="space-y-3">
        <h2 className="display text-lg text-[color:var(--fg)]">All-time practice</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)]">sessions</div>
            <div className="display text-2xl tabular-nums">{sessions.length}</div>
          </div>
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)]">mantras</div>
            <div className="display text-2xl tabular-nums">{totalCount}</div>
          </div>
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)]">minutes</div>
            <div className="display text-2xl tabular-nums">{totalMinutes}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
