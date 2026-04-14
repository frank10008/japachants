import Link from "next/link";
import { listChants, listDeities } from "@/lib/db";

export const dynamic = "force-static";

const FAMOUS_SLUGS = [
  "hanuman-chalisa",
  "shiva-tandava-stotram",
  "bhaja-govindam-moha-mudagaram",
  "aditya-hrudayam",
  "sree-maha-ganesha-pancharatnam",
  "sri-rudram-namakam",
];

export default function Home() {
  const chants = listChants();
  const bySlug = new Map(chants.map((c) => [c.slug, c]));
  const featured = FAMOUS_SLUGS.map((s) => bySlug.get(s)).filter((c): c is NonNullable<typeof c> => !!c);
  const deities = listDeities();

  return (
    <div className="space-y-14">
      <section className="text-center pt-2 md:pt-10">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[color:var(--accent-warm)] mb-3 sm:mb-4">
          a quiet space for chanting
        </p>
        <h1 className="display text-[2.75rem] sm:text-5xl md:text-6xl leading-[1.05] text-[color:var(--fg)] font-light">
          Japa Chants
        </h1>
        <div className="mala-divider max-w-[12rem] mx-auto mt-3">
          <span className="text-xs text-[color:var(--accent-warm)]">◆</span>
        </div>
        <p className="mt-5 text-sm sm:text-base text-[color:var(--fg-soft)] max-w-lg mx-auto leading-relaxed px-2">
          Sanskrit stotras in four scripts, a 108-bead mala counter, and
          word-by-word meanings you can tap. Installable. Works offline.
        </p>
        <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/counter"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] text-white px-7 py-3 text-sm font-medium tracking-wide shadow-lg shadow-[color:var(--accent)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="text-[color:var(--accent-warm)]">◆</span> Begin japa
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-7 py-3 text-sm text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
          >
            Browse {chants.length} chants →
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="display text-xl sm:text-2xl text-[color:var(--fg)]">
              Begin with the classics
            </h2>
            <Link
              href="/library"
              className="text-[11px] uppercase tracking-[0.15em] text-[color:var(--accent)]"
            >
              all →
            </Link>
          </div>
          <ul className="space-y-2">
            {featured.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/chant/${c.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent)] transition-colors"
                >
                  <span
                    aria-hidden
                    className="display text-2xl text-[color:var(--accent-warm)] opacity-50 shrink-0 w-8 text-center"
                  >
                    {c.title.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="display text-base sm:text-lg text-[color:var(--fg)] leading-tight truncate">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-[color:var(--fg-soft)] mt-0.5">
                      {c.deity} · {c.verse_count} {c.verse_count === 1 ? "verse" : "verses"}
                    </div>
                  </div>
                  <span className="text-[color:var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {deities.length > 0 && (
        <section>
          <h2 className="display text-xl sm:text-2xl text-[color:var(--fg)] mb-4">By deity</h2>
          <div className="flex flex-wrap gap-2">
            {deities.slice(0, 24).map((d) => (
              <Link
                key={d.deity}
                href={`/library?deity=${encodeURIComponent(d.deity)}`}
                className="text-xs rounded-full px-3 py-1.5 bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
              >
                {d.deity}{" "}
                <span className="text-[color:var(--fg-soft)] ml-1 opacity-70">{d.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
