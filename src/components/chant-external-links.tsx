import type { ChantLink } from "@/lib/db";

type Props = {
  title: string;
  deity?: string;
  links: ChantLink[];
};

/**
 * Deterministic external search URLs for listening: YouTube + Spotify.
 * No API keys, no lookup — these always work because they're search URLs.
 */
export function ChantExternalLinks({ title, deity, links }: Props) {
  const q = encodeURIComponent(`${title}${deity ? ` ${deity}` : ""} sanskrit chant`);
  const youtube = `https://www.youtube.com/results?search_query=${q}`;
  const spotify = `https://open.spotify.com/search/${encodeURIComponent(title + " chant")}`;
  const greenmesg = links.find((l) => l.source === "greenmesg")?.url;

  return (
    <nav
      aria-label="External listen / read links"
      className="flex flex-wrap justify-center gap-2"
    >
      <a
        href={youtube}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
      >
        <span aria-hidden className="text-[color:var(--accent)] text-sm leading-none">▶</span>
        YouTube
      </a>
      <a
        href={spotify}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
      >
        <span aria-hidden className="text-[color:var(--accent)]">♫</span>
        Spotify
      </a>
      {greenmesg && (
        <a
          href={greenmesg}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
        >
          <span aria-hidden>◐</span>
          greenmesg
        </a>
      )}
    </nav>
  );
}
