import { AnimatePresence, motion } from "framer-motion";
import type { ArtEra } from "@/data/movements";

type SlideContentProps = {
  slide: ArtEra;
  activeIndex: number;
};

export function SlideContent({ slide, activeIndex }: SlideContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={activeIndex}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl rounded-2xl border border-white/30 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl will-change-transform"
        aria-label={`${slide.title} scrollytelling panel`}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {String(slide.id).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-white/70">
            {slide.period}
          </span>
        </div>
        <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.02em]">
          {slide.title}
        </h2>
        <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/90">
          {slide.heroSubtitle}
        </p>
        <ul className="mt-6 space-y-2 border-t border-white/20 pt-4">
          {slide.highlights.slice(0, 4).map((highlight) => (
            <li key={highlight} className="text-sm text-white/80">
              {highlight}
            </li>
          ))}
        </ul>
        <a
          href={`/detail?era=${slide.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/50 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:bg-white/25"
        >
          Learn More <span aria-hidden>→</span>
        </a>
      </motion.article>
    </AnimatePresence>
  );
}
