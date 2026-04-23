 "use client";

import { MovementCard } from "@/components/MovementCard";
import { artMovements } from "@/data/movements";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 pb-12 pt-10 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:flex lg:flex-col">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Museum</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Chronology</p>
          </div>
          <nav className="mt-6 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {artMovements.map((movement) => (
                <li key={movement.slug}>
                  <a
                    href={`#movement-${movement.slug}`}
                    className="block rounded-md px-2 py-2 text-xs uppercase tracking-[0.08em] text-white/65 transition hover:bg-white/10 hover:text-white"
                  >
                    {movement.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 border-t border-white/20 pt-4">
            <a href="/compare" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80 hover:text-white">
              Compare Movements
            </a>
          </div>
        </aside>

        <section>
          <header className="pb-8 pt-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Permanent Collection</p>
            <h1 className="mt-4 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] md:text-7xl">
              Art Through
              <br />
              The Ages
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
              Cinematic Swiss-minimal timeline with immersive movement cards and curated object storytelling.
            </p>
          </header>

          <section className="space-y-8 pb-20">
            {artMovements.map((movement) => (
              <article
                key={movement.slug}
                id={`movement-${movement.slug}`}
                className="relative isolate flex min-h-[84svh] items-center py-10"
              >
                <div
                  className="absolute inset-0 -z-20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${movement.bgImage})` }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/25 to-black/70" />
                <div className="w-full">
                  <MovementCard movement={movement} />
                </div>
              </article>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
