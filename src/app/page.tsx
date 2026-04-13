import Link from "next/link";
import { listChants, listDeities } from "@/lib/db";

export const dynamic = "force-static";

export default function Home() {
  const chants = listChants();
  const deities = listDeities();
  const featured = chants.slice(0, 5);

  return (
    <div className="space-y-14">
      <section className="text-center pt-4 md:pt-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--accent-soft)] mb-4">a quiet space for chanting</p>
        <h1 className="display text-5xl md:text-6xl leading-[1.05] text-[color:var(--fg)]">
          Japa Chants
        </h1>
        <p className="mt-5 text-[color:var(--fg-soft)] max-w-xl mx-auto leading-relaxed">
          Sanskrit stotras, Hindi &amp; Tamil translations, IAST transliteration, and a mala
          counter — all in one place. Installable. Works offline.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/counter"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] text-white px-6 py-3 text-sm font-medium shadow-lg shadow-[color:var(--accent)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Begin japa
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-6 py-3 text-sm text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
          >
            Browse chants
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="display text-2xl text-[color:var(--fg)]">Featured chants</h2>
            <Link href="/library" className="text-sm text-[color:var(--fg-soft)] hover:text-[color:var(--accent)]">
              All {chants.length} →
            </Link>
          </div>
          <ul className="space-y-2">
            {featured.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/chant/${c.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent)] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="display text-lg text-[color:var(--fg)] truncate">{c.title}</div>
                    <div className="text-xs text-[color:var(--fg-soft)] mt-0.5">
                      {c.deity} · {c.verse_count} {c.verse_count === 1 ? "verse" : "verses"}
                    </div>
                  </div>
                  <span className="ml-4 text-[color:var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {deities.length > 0 && (
        <section>
          <h2 className="display text-2xl text-[color:var(--fg)] mb-4">By deity</h2>
          <div className="flex flex-wrap gap-2">
            {deities.slice(0, 20).map((d) => (
              <Link
                key={d.deity}
                href={`/library?deity=${encodeURIComponent(d.deity)}`}
                className="text-sm rounded-full px-3 py-1.5 bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
              >
                {d.deity} <span className="text-[color:var(--fg-soft)] ml-1">{d.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
