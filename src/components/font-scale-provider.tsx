"use client";

import { useEffect } from "react";
import { useCounterStore } from "@/lib/counter-store";

export function FontScaleProvider() {
  const fontScale = useCounterStore((s) => s.settings.fontScale);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
  }, [fontScale]);
  return null;
}
