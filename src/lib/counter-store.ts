"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Session = {
  id: string;
  date: string;
  mantra_slug: string | null;
  mantra_title: string | null;
  count: number;
  target: number;
  duration_seconds: number;
};

export type ReadingMode = "translation" | "chanting";
export type ChantingScript = "sanskrit" | "tamil" | "iast";

type Settings = {
  target: number;
  haptics: boolean;
  defaultScript: "sanskrit" | "hindi" | "tamil" | "transliteration";
  fontScale: 0.85 | 1 | 1.15 | 1.35 | 1.6;
  keepAwake: boolean;
  readingMode: ReadingMode;
  chantingScript: ChantingScript;
};

type CounterState = {
  count: number;
  startedAt: number | null;
  currentMantra: { slug: string; title: string } | null;
  sessions: Session[];
  settings: Settings;
  inc: () => void;
  dec: () => void;
  reset: () => void;
  setMantra: (slug: string, title: string) => void;
  clearMantra: () => void;
  saveSession: () => void;
  updateSettings: (s: Partial<Settings>) => void;
};

const DEFAULT_SETTINGS: Settings = {
  target: 108,
  haptics: true,
  defaultScript: "transliteration",
  fontScale: 1,
  keepAwake: false,
  readingMode: "translation",
  chantingScript: "sanskrit",
};

function vibrate(pattern: number | number[], enabled: boolean) {
  if (!enabled) return;
  if (typeof window === "undefined") return;
  const nav = window.navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate === "function") {
    try {
      nav.vibrate(pattern);
    } catch {
      /* swallow — some platforms throw on rapid repeat */
    }
  }
}

/** iOS Safari doesn't expose navigator.vibrate at all. Everything Android
 *  and desktop Chrome/Firefox does. Used by the settings screen to explain
 *  why the toggle may do nothing on iPhone. */
export function hapticsSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof (window.navigator as Navigator & { vibrate?: unknown }).vibrate === "function";
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
      count: 0,
      startedAt: null,
      currentMantra: null,
      sessions: [],
      settings: DEFAULT_SETTINGS,

      inc: () => {
        const s = get();
        vibrate(30, s.settings.haptics);
        set({
          count: s.count + 1,
          startedAt: s.startedAt ?? Date.now(),
        });
      },
      dec: () => {
        const s = get();
        vibrate([15, 40, 15], s.settings.haptics);
        set({ count: Math.max(0, s.count - 1) });
      },
      reset: () => set({ count: 0, startedAt: null }),
      setMantra: (slug, title) => set({ currentMantra: { slug, title } }),
      clearMantra: () => set({ currentMantra: null }),

      saveSession: () => {
        const s = get();
        if (s.count === 0) return;
        const elapsed = s.startedAt ? Math.floor((Date.now() - s.startedAt) / 1000) : 0;
        const session: Session = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          mantra_slug: s.currentMantra?.slug ?? null,
          mantra_title: s.currentMantra?.title ?? null,
          count: s.count,
          target: s.settings.target,
          duration_seconds: elapsed,
        };
        set({
          sessions: [session, ...s.sessions].slice(0, 100),
          count: 0,
          startedAt: null,
        });
      },

      updateSettings: (partial) =>
        set((s) => ({ settings: { ...s.settings, ...partial } })),
    }),
    {
      name: "japa-counter",
      version: 2,
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as Partial<CounterState>;
        const current = (p.settings ?? {}) as Partial<Settings>;
        return {
          ...p,
          settings: { ...DEFAULT_SETTINGS, ...current },
        } as CounterState;
      },
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CounterState>;
        return {
          ...current,
          ...p,
          settings: {
            ...DEFAULT_SETTINGS,
            ...(current.settings ?? {}),
            ...(p.settings ?? {}),
          },
        };
      },
    }
  )
);
