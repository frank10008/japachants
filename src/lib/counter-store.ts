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

type Settings = {
  target: number;
  haptics: boolean;
  defaultScript: "sanskrit" | "hindi" | "tamil" | "transliteration";
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
};

function vibrate(ms: number, enabled: boolean) {
  if (!enabled) return;
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    try {
      navigator.vibrate(ms);
    } catch {
      // ignore
    }
  }
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
        vibrate(10, s.settings.haptics);
        set({
          count: s.count + 1,
          startedAt: s.startedAt ?? Date.now(),
        });
      },
      dec: () => {
        const s = get();
        vibrate(6, s.settings.haptics);
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
      version: 1,
    }
  )
);
