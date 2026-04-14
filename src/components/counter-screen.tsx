"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCounterStore } from "@/lib/counter-store";

const BEAD_COUNT = 108;
const RING_RADIUS = 140; // svg units

export function CounterScreen() {
  const searchParams = useSearchParams();
  const count = useCounterStore((s) => s.count);
  const target = useCounterStore((s) => s.settings.target);
  const startedAt = useCounterStore((s) => s.startedAt);
  const currentMantra = useCounterStore((s) => s.currentMantra);
  const sessions = useCounterStore((s) => s.sessions);
  const inc = useCounterStore((s) => s.inc);
  const dec = useCounterStore((s) => s.dec);
  const reset = useCounterStore((s) => s.reset);
  const setMantra = useCounterStore((s) => s.setMantra);
  const saveSession = useCounterStore((s) => s.saveSession);

  const [confirmReset, setConfirmReset] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const lastTap = useRef(0);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressed = useRef(false);

  // hydrate client-side so we don't SSR a bunch of localStorage-dependent UI
  useEffect(() => setHydrated(true), []);

  // pick up ?mantra=slug from the URL
  useEffect(() => {
    const slug = searchParams.get("mantra");
    if (slug && slug !== currentMantra?.slug) {
      // lightweight: derive title from slug
      const title = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setMantra(slug, title);
    }
  }, [searchParams, currentMantra?.slug, setMantra]);

  // tick elapsed time while counting
  useEffect(() => {
    if (!startedAt) {
      setElapsed(0);
      return;
    }
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const onPointerDown = () => {
    longPressed.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressed.current = true;
      dec();
    }, 500);
  };

  const onPointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (!longPressed.current) inc();
  };

  const onPointerCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const onCountDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 400) {
      setConfirmReset(true);
    }
    lastTap.current = now;
  };

  const progress = Math.min(1, count / target);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const pace = elapsed > 0 ? ((count / elapsed) * 60).toFixed(1) : "0.0";

  const hasCount = count > 0;

  return (
    <div className="counter-wrapper relative flex flex-col items-center select-none pt-2">
      {/* Mantra header */}
      <div className="w-full max-w-md mb-3 sm:mb-4">
        {currentMantra ? (
          <Link
            href={`/chant/${currentMantra.slug}`}
            className="block text-center rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2 hover:border-[color:var(--accent)] transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--accent-soft)]">chanting</div>
            <div className="display text-lg text-[color:var(--fg)] truncate">{currentMantra.title}</div>
          </Link>
        ) : (
          <Link
            href="/library"
            className="block text-center text-sm text-[color:var(--fg-soft)] hover:text-[color:var(--accent)]"
          >
            Choose a mantra from the library →
          </Link>
        )}
      </div>

      {/* Circular counter — mobile-first sizing: 82% of viewport width, capped by screen height */}
      <div className="relative aspect-square w-[min(82vw,min(68vh,380px))] mt-1 sm:mt-2">
        <svg
          viewBox="-150 -150 300 300"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {Array.from({ length: BEAD_COUNT }).map((_, i) => {
            const angle = (i / BEAD_COUNT) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * RING_RADIUS;
            const y = Math.sin(angle) * RING_RADIUS;
            const lit =
              count >= BEAD_COUNT
                ? true
                : i < (count % BEAD_COUNT);
            const isMeru = i === 0;
            if (isMeru) {
              return (
                <circle
                  key="meru"
                  cx={x}
                  cy={y}
                  r={6}
                  fill={count >= BEAD_COUNT ? "var(--accent-warm)" : "var(--maroon)"}
                  className="transition-all duration-300"
                  style={
                    count >= BEAD_COUNT
                      ? {
                          filter:
                            "drop-shadow(0 0 6px var(--accent-warm)) drop-shadow(0 0 2px var(--accent-warm))",
                        }
                      : undefined
                  }
                />
              );
            }
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={lit ? 4 : 3.5}
                fill={lit ? "var(--accent-warm)" : "var(--bead-unlit)"}
                className="transition-all duration-200"
                style={
                  lit
                    ? {
                        filter:
                          "drop-shadow(0 0 5px var(--bead-glow)) drop-shadow(0 0 2px var(--bead-glow))",
                      }
                    : undefined
                }
              />
            );
          })}
        </svg>

        <motion.button
          type="button"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
          onContextMenu={(e) => e.preventDefault()}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween", duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-8 rounded-full flex flex-col items-center justify-center text-[color:var(--cream)] touch-none"
          style={{
            background:
              "radial-gradient(circle at 42% 36%, #e88c40 0%, #b84818 35%, #7a1c1c 70%, #3d0a0a 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -12px 28px rgba(0,0,0,0.25), var(--counter-shadow)",
            outline: "1.5px solid rgba(232, 162, 60, 0.3)",
            outlineOffset: "-1px",
          }}
          aria-label="Tap to count. Long press to decrement. Double-tap number to reset."
        >
          <div
            className="counter-num text-[clamp(4.5rem,18vw,7rem)] text-[color:var(--cream)]"
            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
            onClick={(e) => {
              e.stopPropagation();
              onCountDoubleTap();
            }}
          >
            {hydrated ? count : "—"}
          </div>
          <div className="text-[1rem] sm:text-[1.125rem] opacity-55 mt-1 font-normal">
            / {target}
          </div>
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="mt-7 w-full max-w-md">
        <div className="h-[2px] w-full bg-[color:var(--bead-unlit)] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(100, progress * 100)}%`,
              background:
                "linear-gradient(90deg, var(--accent), var(--accent-warm))",
            }}
          />
        </div>
      </div>

      {/* Session stats */}
      <div className="mt-5 grid grid-cols-3 text-center w-full max-w-md divide-x divide-[color:var(--border)]">
        <div className="px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)] opacity-75">
            mantras
          </div>
          <div
            className="display text-2xl text-[color:var(--fg)] font-light mt-1"
            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
          >
            {hydrated ? count : "—"}
          </div>
        </div>
        <div className="px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)] opacity-75">
            elapsed
          </div>
          <div
            className="display text-2xl text-[color:var(--fg)] font-light mt-1"
            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
          >
            {hydrated ? `${minutes}:${seconds.toString().padStart(2, "0")}` : "—"}
          </div>
        </div>
        <div className="px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-warm)] opacity-75">
            per min
          </div>
          <div
            className="display text-2xl text-[color:var(--fg)] font-light mt-1"
            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
          >
            {hydrated ? pace : "—"}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex gap-3">
        <button
          type="button"
          onClick={saveSession}
          disabled={!hasCount}
          className="rounded-full bg-[color:var(--accent)] text-white px-6 py-3 text-sm disabled:opacity-40 min-w-[120px]"
        >
          Save session
        </button>
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          disabled={!hasCount}
          className="rounded-full border border-[color:var(--border)] text-[color:var(--fg)] px-6 py-3 text-sm disabled:opacity-40 min-w-[100px]"
        >
          Reset
        </button>
      </div>

      <p className="mt-6 text-[11px] text-[color:var(--fg-soft)] text-center max-w-xs leading-relaxed">
        Tap circle to count · hold to decrement · double-tap the number to reset
      </p>

      {hydrated && sessions.length > 0 && (
        <section className="mt-12 w-full max-w-md">
          <h2 className="display text-lg text-[color:var(--fg)] mb-3">Recent sessions</h2>
          <ul className="space-y-2">
            {sessions.slice(0, 5).map((s) => {
              const mins = Math.floor(s.duration_seconds / 60);
              return (
                <li
                  key={s.id}
                  className="flex items-center justify-between text-sm rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[color:var(--fg)] truncate">{s.mantra_title ?? "—"}</div>
                    <div className="text-[10px] text-[color:var(--fg-soft)]">
                      {new Date(s.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs text-[color:var(--fg-soft)] tabular-nums ml-3">
                    {s.count} · {mins}m
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">
          <div className="bg-[color:var(--bg)] rounded-2xl border border-[color:var(--border)] p-6 max-w-xs w-full text-center shadow-2xl">
            <p className="display text-lg text-[color:var(--fg)]">Reset count?</p>
            <p className="text-sm text-[color:var(--fg-soft)] mt-1">
              The current count ({count}) will be lost.
            </p>
            <div className="mt-4 flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-[color:var(--border)] px-5 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
                className="rounded-full bg-[color:var(--maroon)] text-white px-5 py-2 text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
