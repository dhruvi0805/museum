import type { ArtMovement } from "@/data/movements";

type MovementCardProps = {
  movement: ArtMovement;
};

const externalLinks: Record<string, string> = {
  "claude-monet": "https://claudemonetgallery.org/",
  "bauhaus": "https://www.metmuseum.org/essays/the-bauhaus-1919-1933",
  "wassily-kandinsky": "https://www.wassilykandinsky.net/",
};

export function MovementCard({ movement }: MovementCardProps) {
  const link = externalLinks[movement.id];

  return (
    <article
      className={`rounded-lg border p-5 shadow-sm transition hover:-translate-y-0.5 ${
        movement.featured
          ? "border-amber-400 bg-amber-50"
          : "border-slate-200 bg-white"
      }`}
      aria-label={`${movement.title} museum plaque card`}
    >
      <div className="relative mb-4 h-44 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-500">Image Placeholder</div>
      </div>

      <div className="flex items-start gap-3">
        <div className={`h-12 w-1 rounded-sm ${movement.featured ? "bg-amber-500" : "bg-slate-500"}`} />
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900">{movement.title}</h3>
          <p className="text-xs uppercase tracking-wide text-slate-500">{movement.period}</p>
        </div>
      </div>

      <p className="mt-4 text-sm font-sans leading-relaxed text-slate-700">{movement.description}</p>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded border border-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:bg-slate-900 hover:text-white"
        >
          Learn More
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 inline-block rounded border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Link coming soon
        </button>
      )}
    </article>
  );
}
