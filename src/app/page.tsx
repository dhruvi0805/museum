 "use client";

import { useMemo, useState } from "react";
import { MovementCard } from "@/components/MovementCard";
import { artMovements } from "@/data/movements";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [facet, setFacet] = useState("all");
  const [compareA, setCompareA] = useState(artMovements[1]?.slug ?? "");
  const [compareB, setCompareB] = useState(artMovements[6]?.slug ?? "");

  const facets = useMemo(
    () => ["all", ...Array.from(new Set(artMovements.map((movement) => movement.filterFacet)))],
    [],
  );

  const filtered = useMemo(() => {
    return artMovements.filter((movement) => {
      const matchesFacet = facet === "all" || movement.filterFacet === facet;
      const searchable = [
        movement.title,
        movement.period,
        movement.description,
        movement.heroSubtitle,
        ...movement.highlights,
        ...movement.searchTags,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = query.trim().length === 0 || searchable.includes(query.trim().toLowerCase());
      return matchesFacet && matchesQuery;
    });
  }, [query, facet]);

  const movementA = artMovements.find((movement) => movement.slug === compareA);
  const movementB = artMovements.find((movement) => movement.slug === compareB);

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <header className="mx-auto w-full max-w-7xl px-6 pb-8 pt-14 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Permanent Collection</p>
        <h1 className="mt-4 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] md:text-7xl">
          Art Through
          <br />
          The Ages
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
          Cinematic Swiss-minimal timeline with immersive movement cards, curated object stories, and fast compare tools.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Artist, movement, period..."
              className="h-11 rounded-md border border-white/25 bg-white/10 px-4 text-sm text-white outline-none ring-white/40 placeholder:text-white/45 focus:ring-1"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">Filter</span>
            <select
              value={facet}
              onChange={(event) => setFacet(event.target.value)}
              className="h-11 rounded-md border border-white/25 bg-white/10 px-4 text-sm text-white outline-none ring-white/40 focus:ring-1"
            >
              {facets.map((facetOption) => (
                <option key={facetOption} value={facetOption} className="bg-black">
                  {facetOption}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <a href="/compare" className="text-xs uppercase tracking-[0.15em] text-white/70 hover:text-white">
            Open dedicated compare view →
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 pb-6 lg:px-8">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Compare Movements</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <select value={compareA} onChange={(event) => setCompareA(event.target.value)} className="h-11 rounded-md border border-white/25 bg-black/20 px-4 text-sm text-white">
              {artMovements.map((movement) => (
                <option key={`a-${movement.slug}`} value={movement.slug} className="bg-black">
                  {movement.title}
                </option>
              ))}
            </select>
            <select value={compareB} onChange={(event) => setCompareB(event.target.value)} className="h-11 rounded-md border border-white/25 bg-black/20 px-4 text-sm text-white">
              {artMovements.map((movement) => (
                <option key={`b-${movement.slug}`} value={movement.slug} className="bg-black">
                  {movement.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-4 border-t border-white/20 pt-4 md:grid-cols-2">
            {[movementA, movementB].map((movement) =>
              movement ? (
                <article key={movement.slug} className="space-y-2 text-sm text-white/85">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">{movement.title}</p>
                  <p><strong>Period:</strong> {movement.period}</p>
                  <p><strong>Mood:</strong> {movement.visualMood}</p>
                  <p><strong>Medium:</strong> {movement.facts.medium}</p>
                  <p><strong>Key Figures:</strong> {movement.facts.keyFigures}</p>
                </article>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="space-y-8 pb-20">
        {filtered.map((movement) => (
          <article
            key={movement.slug}
            className="relative isolate flex min-h-[84svh] items-center px-6 py-10 lg:px-8"
          >
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${movement.bgImage})` }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/25 to-black/70" />
            <div className="mx-auto w-full max-w-7xl">
              <MovementCard movement={movement} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
