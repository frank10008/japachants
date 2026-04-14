import Link from "next/link";
import Image from "next/image";
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
      <section className="text-center pt-2 md:pt-8">
        <div className="flex justify-center">
          <Image
            src="/japa108/logo.png"
            alt="japa 108"
            width={720}
            height={191}
            priority
            className="h-20 sm:h-24 md:h-28 w-auto"
          />
        </div>
        <hr className="hr-gold max-w-[12rem] mx-auto mt-6" />
        <p className="mt-5 text-[15px] sm:text-base text-[color:var(--fg)] max-w-lg mx-auto leading-[1.6] px-2">
          Sanskrit stotras in four scripts, a 108-bead mala counter, and
          word-by-word meanings you can tap. Installable. Works offline.
        </p>
        <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/counter"
            className="inline-flex items-center gap-2 rounded-[3px] text-white px-8 py-3 text-sm font-bold tracking-wide uppercase shadow-[0_10px_18px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-transform"
            style={{
              background: "linear-gradient(to right, #ba791a 0%, #cb9418 100%)",
              minHeight: "54px",
            }}
          >
            Begin japa
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 rounded-[10px] border-2 border-[color:var(--accent-warm)] bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--fg)] hover:bg-[color:var(--accent-warm)] hover:text-white transition-colors"
            style={{ minHeight: "44px" }}
          >
            Browse {chants.length} chants →
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="display text-[20px] sm:text-[24px] leading-[1.25]">
              Begin with the classics
            </h2>
            <Link
              href="/library"
              className="text-[11px] uppercase tracking-[0.15em] font-bold text-[color:var(--accent-warm)] hover:text-[color:var(--fg-soft)]"
            >
              all →
            </Link>
          </div>
          <hr className="hr-gold mb-4" />
          <ul className="space-y-2">
            {featured.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/chant/${c.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent-warm)] transition-colors shadow-[var(--card-shadow)]"
                >
                  <span
                    aria-hidden
                    className="display text-[28px] leading-none text-[color:var(--accent)] shrink-0 w-8 text-center"
                  >
                    {c.title.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="display text-[17px] sm:text-[19px] leading-tight truncate">
                      {c.title}
                    </div>
                    <div className="text-[12px] text-[color:var(--fg)] opacity-70 mt-0.5">
                      {c.deity} · {c.verse_count} {c.verse_count === 1 ? "verse" : "verses"}
                    </div>
                  </div>
                  <span className="text-[color:var(--accent-warm)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
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
          <h2 className="display text-[20px] sm:text-[24px] mb-4">By deity</h2>
          <hr className="hr-gold mb-4" />
          <div className="flex flex-wrap gap-2">
            {deities.slice(0, 24).map((d) => (
              <Link
                key={d.deity}
                href={`/library?deity=${encodeURIComponent(d.deity)}`}
                className="text-xs rounded-full px-3 py-1.5 bg-[color:var(--surface)] border border-[color:var(--border)] hover:border-[color:var(--accent-warm)] hover:text-[color:var(--accent-warm)] transition-colors"
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
