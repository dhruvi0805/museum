import type { ArtEra } from "@/data/movements";

type MovementCardProps = {
  movement: ArtEra;
};

export function MovementCard({ movement }: MovementCardProps) {
  return (
    <article
      className="w-full max-w-2xl rounded-2xl border border-white/30 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-1"
      aria-label={`${movement.title} glass museum card`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          {String(movement.id).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase tracking-[0.16em] text-white/70">{movement.period}</span>
      </div>

      <h3 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.02em]">{movement.title}</h3>
      <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/90">{movement.heroSubtitle}</p>
      <ul className="mt-6 space-y-2 border-t border-white/20 pt-4">
        {movement.highlights.slice(0, 4).map((highlight) => (
          <li key={highlight} className="text-sm text-white/80">
            {highlight}
          </li>
        ))}
      </ul>
      <a
        href={`/detail?era=${movement.slug}`}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/50 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:bg-white/25"
      >
        Learn More <span aria-hidden>→</span>
      </a>
    </article>
  );
}
