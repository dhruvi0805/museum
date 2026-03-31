import { artMovements } from "@/data/movements";

type EraLink = {
  era: string;
  id: string;
};

const eraLinks: EraLink[] = Array.from(
  artMovements
    .map((m) => m.era)
    .reduce((acc, era) => acc.add(era), new Set<string>()),
).map((era) => ({ era, id: era.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 z-20 h-screen overflow-y-auto rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-serif font-bold uppercase">Timeline Navigation</h2>
          <nav aria-label="Art movement eras" className="space-y-3 text-sm font-sans">
            {eraLinks.map((eraItem) => (
              <a
                key={eraItem.id}
                href={`#${eraItem.id}`}
                className="block rounded-md px-2 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {eraItem.era}
              </a>
            ))}
          </nav>
        </aside>

        <section className="overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <header className="mb-8 space-y-3">
            <h1 className="text-4xl font-serif font-bold">The Chronos Gallery</h1>
            <p className="max-w-3xl text-base font-sans leading-relaxed">
              A Swiss design-inspired timeline of art movements from prehistoric epochs to mid-century modernism. The left navigation provides direct links to the era clusters and the right section includes museum plaque-style movement cards.
            </p>
          </header>

          <div className="space-y-10">
            {eraLinks.map((eraItem) => {
              const movementsForEra = artMovements.filter((movement) => movement.era === eraItem.era);
              return (
                <article key={eraItem.id} id={eraItem.id} className="space-y-4">
                  <h2 className="text-2xl font-serif font-semibold tracking-wide">{eraItem.era}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {movementsForEra.map((movement) => (
                      <div
                        key={movement.id}
                        className={`border-l-4 p-4 ${
                          movement.featured ? "border-amber-400 bg-amber-50" : "border-slate-900 bg-white"
                        } shadow-sm`}
                      >
                        <h3 className="text-xl font-serif font-semibold">{movement.title}</h3>
                        <p className="text-xs uppercase tracking-widest text-slate-500">{movement.period}</p>
                        <p className="mt-2 text-sm font-sans leading-relaxed text-slate-700">{movement.description}</p>
                        <a
                          href="#"
                          className="mt-3 inline-block rounded border border-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 transition hover:bg-slate-900 hover:text-white"
                        >
                          Learn More
                        </a>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
