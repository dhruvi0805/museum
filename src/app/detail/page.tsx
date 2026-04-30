"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { artMovements } from "@/data/movements";
import { RevealSection } from "@/components/reading/RevealSection";

export default function DetailPage() {
  const params = useSearchParams();
  const slug = params.get("era");
  const movement = useMemo(
    () => artMovements.find((item) => item.slug === slug) ?? null,
    [slug],
  );

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

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-10 text-white lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/" className="inline-flex text-xs uppercase tracking-[0.14em] text-white/70 hover:text-white">
          ← All eras
        </Link>
        <RevealSection className="mt-6 grid gap-8 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl md:grid-cols-[1fr_1.2fr]">
          <div className="min-h-[380px] rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${movement.bgImage})` }} />
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">{movement.period}</p>
            <h1 className="mt-3 text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.02em]">{movement.title}</h1>
            <p className="mt-4 text-sm leading-7 text-white/90">{movement.description}</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-md border border-white/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">Visual Mood</p>
                <p className="mt-1 text-sm">{movement.visualMood}</p>
              </div>
              <div className="rounded-md border border-white/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">Why It Matters</p>
                <p className="mt-1 text-sm">{movement.heroSubtitle}</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <RevealSection className="rounded-xl border border-white/20 bg-white/5 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Curated Objects</h2>
            <ul className="mt-4 space-y-4">
              {movement.objects.map((obj) => (
                <li key={obj.title} className="border-t border-white/15 pt-3 text-sm leading-6">
                  <p className="font-semibold text-white">{obj.title}</p>
                  <p className="text-white/80">{obj.artist} · {obj.date}</p>
                  <p className="text-white/75">{obj.story}</p>
                </li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection className="rounded-xl border border-white/20 bg-white/5 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">At a Glance</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p><strong>Medium:</strong> {movement.facts.medium}</p>
              <p><strong>Geography:</strong> {movement.facts.geography}</p>
              <p><strong>Key Figures:</strong> {movement.facts.keyFigures}</p>
              <p><strong>Tags:</strong> {movement.filterFacet}, {movement.visualMood}</p>
            </div>
          </RevealSection>
        </section>
      </div>
    </main>
  );
}
