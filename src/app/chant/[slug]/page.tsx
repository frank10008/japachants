import Link from "next/link";
import { notFound } from "next/navigation";
import { getChantBySlug, getVerses, listChants, getWordMeanings, getChantLinks } from "@/lib/db";
import { ReadingView } from "@/components/reading-view";
import { ChantExternalLinks } from "@/components/chant-external-links";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return listChants().map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const chant = getChantBySlug(slug);
  if (!chant) return { title: "Not found" };
  return {
    title: `${chant.title} — Japa Chants`,
    description: `${chant.title}${chant.deity ? ` (${chant.deity})` : ""}. Sanskrit, Hindi, Tamil, and IAST transliteration.`,
  };
}

export default async function ChantPage({ params }: Props) {
  const { slug } = await params;
  const chant = getChantBySlug(slug);
  if (!chant) notFound();
  const verses = getVerses(chant.id);
  const wordMeanings = getWordMeanings(chant.id);
  const links = getChantLinks(chant.id);

  return (
    <article className="space-y-6">
      <header className="text-center space-y-2">
        <Link
          href="/library"
          className="inline-block text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] py-1"
        >
          ← Library
        </Link>
        <h1 className="display text-2xl sm:text-3xl md:text-4xl text-[color:var(--fg)] leading-tight px-2">
          {chant.title}
        </h1>
        {chant.deity && (
          <p className="text-[11px] text-[color:var(--accent-warm)] uppercase tracking-[0.25em]">
            {chant.deity}
          </p>
        )}
        <div className="mala-divider max-w-xs mx-auto pt-2">
          <span>◆</span>
        </div>
      </header>

      <ChantExternalLinks title={chant.title} deity={chant.deity ?? undefined} links={links} />

      <ReadingView chant={chant} verses={verses} wordMeanings={wordMeanings} />

      <p className="text-center text-[11px] text-[color:var(--fg-soft)] pt-4">
        Primary text from{" "}
        {chant.source_url ? (
          <a href={chant.source_url} target="_blank" rel="noopener" className="underline">
            vignanam.org
          </a>
        ) : (
          "vignanam.org"
        )}
        {wordMeanings.length > 0 && (
          <>
            {" · "}
            word meanings from <a href="https://greenmesg.org" target="_blank" rel="noopener" className="underline">greenmesg.org</a>
          </>
        )}
      </p>
    </article>
  );
}
