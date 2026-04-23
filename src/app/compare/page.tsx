"use client";

import { useState } from "react";
import Link from "next/link";
import { artMovements } from "@/data/movements";

export default function ComparePage() {
  const [movementA, setMovementA] = useState(artMovements[1]?.slug ?? "");
  const [movementB, setMovementB] = useState(artMovements[6]?.slug ?? "");

  const eraA = artMovements.find((item) => item.slug === movementA);
  const eraB = artMovements.find((item) => item.slug === movementB);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-10 text-white lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Link href="/" className="inline-flex text-xs uppercase tracking-[0.14em] text-white/70 hover:text-white">
          ← Back to timeline
        </Link>
        <h1 className="mt-4 text-4xl font-semibold uppercase tracking-[-0.02em]">Movement Compare</h1>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <select value={movementA} onChange={(event) => setMovementA(event.target.value)} className="h-11 rounded-md border border-white/30 bg-white/10 px-3 text-sm">
            {artMovements.map((item) => (
              <option key={`ca-${item.slug}`} value={item.slug} className="bg-black">
                {item.title}
              </option>
            ))}
          </select>
          <select value={movementB} onChange={(event) => setMovementB(event.target.value)} className="h-11 rounded-md border border-white/30 bg-white/10 px-3 text-sm">
            {artMovements.map((item) => (
              <option key={`cb-${item.slug}`} value={item.slug} className="bg-black">
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[eraA, eraB].map((item) =>
            item ? (
              <article key={item.slug} className="rounded-xl border border-white/20 bg-white/10 p-5">
                <Link href={`/detail?era=${item.slug}`} className="block overflow-hidden rounded-lg">
                  <div className="h-52 w-full bg-cover bg-center transition duration-300 hover:scale-[1.02]" style={{ backgroundImage: `url(${item.bgImage})` }} />
                </Link>
                <Link href={`/detail?era=${item.slug}`}>
                  <h2 className="mt-4 text-2xl font-semibold uppercase hover:underline">{item.title}</h2>
                </Link>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/70">{item.period}</p>
                <p className="mt-4 text-sm leading-7 text-white/85">{item.heroSubtitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li><strong>Mood:</strong> {item.visualMood}</li>
                  <li><strong>Medium:</strong> {item.facts.medium}</li>
                  <li><strong>Key Figures:</strong> {item.facts.keyFigures}</li>
                </ul>
                <Link
                  href={`/detail?era=${item.slug}`}
                  className="mt-5 inline-flex rounded-md border border-white/35 px-3 py-2 text-xs uppercase tracking-[0.15em] text-white/85 hover:bg-white/15"
                >
                  Open Movement →
                </Link>
              </article>
            ) : null,
          )}
        </div>
      </div>
    </main>
  );
}
