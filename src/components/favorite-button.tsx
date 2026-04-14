"use client";

import { useEffect, useState } from "react";
import { useCounterStore } from "@/lib/counter-store";

type Props = {
  slug: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  stopPropagation?: boolean;
};

/**
 * Star button that toggles a chant in the user's favorites list.
 * Hydration-safe: renders a placeholder on the server, fills in the actual
 * starred state after the Zustand persist hydration.
 */
export function FavoriteButton({
  slug,
  size = "md",
  className = "",
  stopPropagation = true,
}: Props) {
  const favorites = useCounterStore((s) => s.favorites);
  const toggleFavorite = useCounterStore((s) => s.toggleFavorite);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const isFav = hydrated && favorites.includes(slug);

  const sizeClass =
    size === "lg" ? "w-11 h-11 text-[22px]" : size === "sm" ? "w-8 h-8 text-[15px]" : "w-10 h-10 text-[18px]";

  return (
    <button
      type="button"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFav}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        e.preventDefault();
        toggleFavorite(slug);
      }}
      className={`inline-flex items-center justify-center rounded-full transition-all ${sizeClass} ${
        isFav
          ? "text-[color:var(--accent-warm)] hover:scale-110"
          : "text-[color:var(--fg-soft)] opacity-50 hover:opacity-100 hover:text-[color:var(--accent-warm)]"
      } ${className}`}
    >
      <span aria-hidden className="leading-none">
        {isFav ? "★" : "☆"}
      </span>
    </button>
  );
}
