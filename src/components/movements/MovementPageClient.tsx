"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArtEra } from "@/data/movements";
import type { CanonicalArtwork } from "@/lib/eraTypes";
import { RevealSection } from "@/components/reading/RevealSection";
import { getArtistBlurb } from "@/lib/artistBlurb";
import { getMovementBannerSlides } from "@/lib/movementBanner";
import { MovementBannerCarousel } from "@/components/movements/MovementBannerCarousel";

type MovementPageClientProps = {
  movement: ArtEra;
  eraIndex: number;
  prev: ArtEra | null;
  next: ArtEra | null;
};

export function MovementPageClient({ movement, eraIndex, prev, next }: MovementPageClientProps) {
  const labelNum = String(eraIndex + 1).padStart(2, "0");
  const bannerSlidesRaw = getMovementBannerSlides(movement);
  const bannerSlides =
    bannerSlidesRaw.length > 0
      ? bannerSlidesRaw
      : [{ src: movement.bgImage, alt: `${movement.title} — era image` }];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative min-h-[88vh] w-full">
        <div className="absolute inset-0 z-0 min-h-[88vh]">
          <MovementBannerCarousel slides={bannerSlides} label={`${movement.title} example works`} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/55 to-transparent"
          aria-hidden
        />
        <header className="absolute left-0 top-0 z-10 w-full px-6 pt-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex rounded-md border border-white/25 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white backdrop-blur-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ← All eras
          </Link>
        </header>
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 pt-24 lg:px-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/25 bg-white/10 px-8 py-8 shadow-2xl backdrop-blur-xl md:px-10 md:py-10">
            <p className="text-xs uppercase tracking-[0.16em] text-white">
              <span className="font-semibold">{labelNum}</span> · {movement.period}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-6xl">
              {movement.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white">{movement.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white">Visual mood</p>
                <p className="mt-1 text-sm text-white">{movement.visualMood}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white">Why it matters</p>
                <p className="mt-1 text-sm text-white">{movement.heroSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white">Collection</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold uppercase tracking-[-0.02em] text-white md:text-4xl">
          Works in this era
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white">
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
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-[1] -mt-10 mx-auto w-full max-w-3xl rounded-2xl border border-white/25 bg-white/10 px-6 py-8 shadow-2xl backdrop-blur-xl md:px-10 md:py-9">
                  <h3 className="font-serif text-2xl font-semibold uppercase leading-tight tracking-[-0.02em] text-white md:text-3xl">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white">
                    {work.artist} · {work.date}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {work.keyFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-7 text-white">{work.workBlurb}</p>
                  <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-7 text-white">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white">About the artist</span>
                    <br />
                    {getArtistBlurb(movement, work)}
                  </p>
                  <p className="mt-5 text-[11px] leading-relaxed text-white">
                    {work.attribution.creditLine} · {work.attribution.license}
                  </p>
                  <a
                    href={work.attribution.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-[0.12em] text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    View source
                  </a>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>

        <RevealSection className="mt-24 rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">At a glance</h2>
          <div className="mt-6 space-y-3 text-sm text-white">
            <p>
              <strong>Medium:</strong> {movement.facts.medium}
            </p>
            <p>
              <strong>Geography:</strong> {movement.facts.geography}
            </p>
            <p>
              <strong>Key figures:</strong> {movement.facts.keyFigures}
            </p>
            <p>
              <strong>Tags:</strong> {movement.filterFacet}, {movement.visualMood}
            </p>
          </div>
        </RevealSection>

        <nav
          className="mt-16 flex flex-col justify-between gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-start"
          aria-label="Era pagination"
        >
          {prev ? (
            <Link
              href={`/movements/${prev.slug}`}
              className="group flex max-w-xs flex-col gap-1 text-white transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-white">← Previous</span>
              <span className="text-lg font-semibold tracking-tight group-hover:underline">{prev.title}</span>
            </Link>
          ) : (
            <span className="text-white/25">—</span>
          )}
          {next ? (
            <Link
              href={`/movements/${next.slug}`}
              className="group flex max-w-xs flex-col items-end gap-1 text-right text-white transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-white">Next →</span>
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
