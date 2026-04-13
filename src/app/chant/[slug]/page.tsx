import Link from "next/link";
import { notFound } from "next/navigation";
import { getChantBySlug, getVerses, listChants } from "@/lib/db";
import { ReadingView } from "@/components/reading-view";

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

  return (
    <article className="space-y-8">
      <header className="text-center space-y-2">
        <Link href="/library" className="text-xs text-[color:var(--fg-soft)] hover:text-[color:var(--accent)]">
          ← Library
        </Link>
        <h1 className="display text-3xl md:text-4xl text-[color:var(--fg)] leading-tight">{chant.title}</h1>
        {chant.deity && <p className="text-sm text-[color:var(--accent-soft)] uppercase tracking-[0.2em]">{chant.deity}</p>}
        <div className="mala-divider max-w-xs mx-auto pt-3">
          <span>◆</span>
        </div>
      </header>

      <ReadingView chant={chant} verses={verses} />

      {chant.source_url && (
        <p className="text-center text-xs text-[color:var(--fg-soft)] pt-4">
          Source:{" "}
          <a href={chant.source_url} target="_blank" rel="noopener" className="underline">
            vignanam.org
          </a>
        </p>
      )}
    </article>
  );
}
