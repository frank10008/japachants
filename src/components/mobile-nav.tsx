"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home", icon: "ॐ" },
  { href: "/library", label: "Library", icon: "◈" },
  { href: "/counter", label: "Counter", icon: "◉" },
  { href: "/settings", label: "Settings", icon: "✦" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl bg-[color:var(--bg)]/90 border-t border-[color:var(--border)]"
      style={{ paddingBottom: "max(0.5rem, var(--safe-bottom))" }}
    >
      <ul className="flex justify-around items-stretch max-w-md mx-auto">
        {LINKS.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <li key={l.href} className="flex-1">
              <Link
                href={l.href}
                className={`flex flex-col items-center justify-center py-2.5 min-h-[56px] text-[10px] uppercase tracking-wider transition-colors ${
                  active ? "text-[color:var(--accent)]" : "text-[color:var(--fg-soft)]"
                }`}
              >
                <span className={`text-xl leading-none mb-0.5 ${active ? "" : "opacity-70"}`}>{l.icon}</span>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
