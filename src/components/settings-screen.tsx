"use client";

import { useEffect, useState } from "react";
import { useCounterStore, hapticsSupported } from "@/lib/counter-store";

const TARGETS = [27, 54, 108, 216, 1008];
const SCRIPTS = [
  { value: "sanskrit", label: "Sanskrit (Devanagari)" },
  { value: "hindi", label: "Hindi (Devanagari)" },
  { value: "tamil", label: "Tamil" },
  { value: "transliteration", label: "Transliteration (IAST)" },
] as const;
const FONT_SCALES = [
  { value: 0.85, label: "Compact", preview: "text-base" },
  { value: 1, label: "Default", preview: "text-lg" },
  { value: 1.15, label: "Large", preview: "text-xl" },
  { value: 1.35, label: "Larger", preview: "text-2xl" },
  { value: 1.6, label: "Huge", preview: "text-3xl" },
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
        <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent-warm)]">settings</p>
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
        <h2 className="display text-lg text-[color:var(--fg)]">Chant text size</h2>
        <p className="text-xs text-[color:var(--fg-soft)] -mt-1">
          Affects Sanskrit, Hindi, Tamil and transliteration in the reading view.
        </p>
        <div className="flex flex-wrap gap-2">
          {FONT_SCALES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => updateSettings({ fontScale: f.value })}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                settings.fontScale === f.value
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-[color:var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              <span className="display">अ</span> <span className="ml-1 text-xs">{f.label}</span>
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] p-4 mt-2">
          <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)] mb-2">preview</div>
          <div className="devanagari text-2xl text-[color:var(--fg)] leading-relaxed">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
          </div>
          <div className="italic text-base text-[color:var(--fg-soft)] mt-1 scripted-translation">
            vakratuṇḍa mahākāya sūryakoṭi samaprabha
          </div>
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
          onClick={() => {
            updateSettings({ haptics: !settings.haptics });
            // Give immediate physical confirmation when enabling
            if (!settings.haptics && typeof window !== "undefined") {
              const n = window.navigator as Navigator & {
                vibrate?: (p: number | number[]) => boolean;
              };
              if (typeof n.vibrate === "function") n.vibrate([30, 40, 30]);
            }
          }}
          className="flex items-center justify-between w-full rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] px-4"
          style={{ minHeight: "56px" }}
        >
          <span className="text-[15px]">Vibrate on tap</span>
          <span
            className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${
              settings.haptics
                ? "bg-[color:var(--accent-warm)]"
                : "bg-[color:var(--border)]"
            }`}
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow transition-[left] duration-200 ${
                settings.haptics ? "left-[calc(100%-22px)]" : "left-[2px]"
              }`}
            />
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              const n = window.navigator as Navigator & {
                vibrate?: (p: number | number[]) => boolean;
              };
              if (typeof n.vibrate === "function") n.vibrate([50, 50, 50, 50, 50]);
            }
          }}
          className="w-full text-left rounded-xl border border-[color:var(--border)] px-4 py-3 text-[13px] text-[color:var(--fg-soft)] hover:border-[color:var(--accent-warm)] transition-colors"
        >
          <span className="block font-medium text-[color:var(--fg)]">Test vibration</span>
          <span className="block mt-0.5">Tap to feel a pattern now.</span>
        </button>
        {!hapticsSupported() && (
          <p className="text-[11px] text-[color:var(--fg-soft)] italic px-1 leading-relaxed">
            Your browser doesn&apos;t expose the Vibration API. On iPhone Safari
            web apps cannot trigger haptics — this is an iOS platform limitation.
            On Android the toggle works.
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="display text-lg text-[color:var(--fg)]">All-time practice</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)]">sessions</div>
            <div className="display text-2xl tabular-nums">{sessions.length}</div>
          </div>
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)]">mantras</div>
            <div className="display text-2xl tabular-nums">{totalCount}</div>
          </div>
          <div className="rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] py-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)]">minutes</div>
            <div className="display text-2xl tabular-nums">{totalMinutes}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
