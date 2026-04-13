import Link from "next/link";
import { listChants, listDeities } from "@/lib/db";

export const dynamic = "force-static";

type Props = { searchParams: Promise<{ deity?: string; q?: string }> };

export default async function LibraryPage({ searchParams }: Props) {
  const { deity, q } = await searchParams;
  const all = listChants();
  const deities = listDeities();
  let filtered = all;
  if (deity) filtered = filtered.filter((c) => c.deity === deity);
  if (q) {
    const lc = q.toLowerCase();
    filtered = filtered.filter((c) => c.title.toLowerCase().includes(lc) || (c.slug || "").includes(lc));
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[color:var(--accent-soft)]">the library</p>
        <h1 className="display text-3xl sm:text-4xl text-[color:var(--fg)] mt-1">Chants</h1>
        <p className="text-sm text-[color:var(--fg-soft)] mt-2">
          {filtered.length} of {all.length} chants
          {deity ? ` · ${deity}` : ""}
          {q ? ` · "${q}"` : ""}
        </p>
      </header>

      <form method="GET" action="/library" className="flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search stotras…"
          className="flex-1 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--fg)] outline-none focus:border-[color:var(--accent)] transition-colors"
        />
        {deity && <input type="hidden" name="deity" value={deity} />}
        <button
          type="submit"
          className="rounded-full bg-[color:var(--accent)] text-white px-5 py-2 text-sm"
        >
          Search
        </button>
      </form>

      <nav className="flex flex-wrap gap-2">
        <Link
          href="/library"
          className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
            !deity
              ? "bg-[color:var(--accent)] text-white border-[color:var(--accent)]"
              : "bg-[color:var(--surface)] border-[color:var(--border)] hover:border-[color:var(--accent)]"
          }`}
        >
          All
        </Link>
        {deities.map((d) => (
          <Link
            key={d.deity}
            href={`/library?deity=${encodeURIComponent(d.deity)}`}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              deity === d.deity
                ? "bg-[color:var(--accent)] text-white border-[color:var(--accent)]"
                : "bg-[color:var(--surface)] border-[color:var(--border)] hover:border-[color:var(--accent)]"
            }`}
          >
            {d.deity} <span className="opacity-60 ml-1">{d.count}</span>
          </Link>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-center py-12 text-[color:var(--fg-soft)]">No chants found.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((c) => (
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
      )}
    </div>
  );
}
