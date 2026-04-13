import { Suspense } from "react";
import { CounterScreen } from "@/components/counter-screen";

export const metadata = { title: "Counter — Japa Chants" };

export default function CounterPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[color:var(--fg-soft)]">Loading…</div>}>
      <CounterScreen />
    </Suspense>
  );
}
