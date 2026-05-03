"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { artMovements } from "@/data/movements";
import { RevealSection } from "@/components/reading/RevealSection";
import { getArtistBlurb } from "@/lib/artistBlurb";
import type { CanonicalArtwork } from "@/lib/eraTypes";

function DetailPageInner() {
  const params = useSearchParams();
  const slug = params.get("era");
  const movement = useMemo(
    () => artMovements.find((item) => item.slug === slug) ?? null,
    [slug],
  );

  const eraIndex = useMemo(
    () => (movement ? artMovements.findIndex((e) => e.slug === movement.slug) : -1),
    [movement],
  );
  const prev = eraIndex > 0 ? artMovements[eraIndex - 1] : null;
  const next = eraIndex >= 0 && eraIndex < artMovements.length - 1 ? artMovements[eraIndex + 1] : null;

  if (!movement) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0a0a0a] p-6 text-white">
        <div className="space-y-4 text-center">
          <p className="text-7xl font-semibold tracking-[-0.04em] text-white/30">404</p>
          <p className="text-xs uppercase tracking-[0.16em] text-white/70">Movement not found</p>
          <Link href="/" className="inline-flex rounded-md border border-white/35 px-4 py-2 text-xs uppercase tracking-[0.15em]">
            Return to timeline
          </Link>
        </div>
      </main>
    );
  }

  const labelNum = String(eraIndex + 1).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative min-h-[88vh] w-full">
        <Image
          src={movement.bgImage}
          alt={`${movement.title} — introductory era image`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent"
          aria-hidden
        />
        <header className="absolute left-0 top-0 z-10 w-full px-6 pt-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex rounded-md border border-white/25 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/90 backdrop-blur-md hover:bg-white/10"
          >
            ← All eras
          </Link>
        </header>
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 pt-24 lg:px-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/25 bg-white/10 px-8 py-8 shadow-2xl backdrop-blur-xl md:px-10 md:py-10">
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">
              <span className="font-semibold text-white/90">{labelNum}</span> · {movement.period}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-6xl">
              {movement.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/88">{movement.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Visual mood</p>
                <p className="mt-1 text-sm text-white/90">{movement.visualMood}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Why it matters</p>
                <p className="mt-1 text-sm text-white/90">{movement.heroSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Collection</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold uppercase tracking-[-0.02em] text-white md:text-4xl">
          Works in this era
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
          Ten landmark examples with key visual traits, short context, and artist notes—sources linked for classroom use.
        </p>

        <div className="mt-14 flex flex-col gap-24">
          {movement.artworks.map((work: CanonicalArtwork, i: number) => (
            <RevealSection key={`${work.title}-${i}`} className="scroll-mt-8">
              <article className="flex flex-col gap-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-xl">
                  <Image
                    src={work.imageUrl}
                    alt={`${work.title} by ${work.artist}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    loading={i < 2 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </div>
                <div className="relative z-[1] -mt-10 mx-auto w-full max-w-3xl rounded-2xl border border-white/25 bg-white/10 px-6 py-8 shadow-2xl backdrop-blur-xl md:px-10 md:py-9">
                  <h3 className="font-serif text-2xl font-semibold uppercase leading-tight tracking-[-0.02em] text-white md:text-3xl">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/65">
                    {work.artist} · {work.date}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {work.keyFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/85"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-7 text-white/90">{work.workBlurb}</p>
                  <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-7 text-white/75">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/50">About the artist</span>
                    <br />
                    {getArtistBlurb(movement, work)}
                  </p>
                  <p className="mt-5 text-[11px] leading-relaxed text-white/50">
                    {work.attribution.creditLine} · {work.attribution.license}
                  </p>
                  <a
                    href={work.attribution.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                  >
                    View source
                  </a>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>

        <RevealSection className="mt-24 rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">At a glance</h2>
          <div className="mt-6 space-y-3 text-sm">
            <p>
              <strong className="text-white/90">Medium:</strong> {movement.facts.medium}
            </p>
            <p>
              <strong className="text-white/90">Geography:</strong> {movement.facts.geography}
            </p>
            <p>
              <strong className="text-white/90">Key figures:</strong> {movement.facts.keyFigures}
            </p>
            <p>
              <strong className="text-white/90">Tags:</strong> {movement.filterFacet}, {movement.visualMood}
            </p>
          </div>
        </RevealSection>

        <nav
          className="mt-16 flex flex-col justify-between gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-start"
          aria-label="Era pagination"
        >
          {prev ? (
            <Link
              href={`/detail?era=${prev.slug}`}
              className="group flex max-w-xs flex-col gap-1 text-white/80 transition hover:text-white"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">← Previous</span>
              <span className="text-lg font-semibold tracking-tight group-hover:underline">{prev.title}</span>
            </Link>
          ) : (
            <span className="text-white/25">—</span>
          )}
          {next ? (
            <Link
              href={`/detail?era=${next.slug}`}
              className="group flex max-w-xs flex-col items-end gap-1 text-right text-white/80 transition hover:text-white sm:text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">Next →</span>
              <span className="text-lg font-semibold tracking-tight group-hover:underline">{next.title}</span>
            </Link>
          ) : (
            <span className="text-right text-white/25 sm:ml-auto">—</span>
          )}
        </nav>
      </div>
    </main>
  );
}

export default function DetailPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#0a0a0a] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Loading…</p>
        </main>
      }
    >
      <DetailPageInner />
    </Suspense>
  );
}
