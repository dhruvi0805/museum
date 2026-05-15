"use client";

import { useEffect, useRef, useState } from "react";
import type { CanonicalArtwork } from "@/lib/eraTypes";

type Props = {
  artworks: CanonicalArtwork[];
};

/**
 * Fixed vertical navigation bar on the left edge of era pages.
 * One dot per artwork section, plus a "top" dot for the hero banner.
 * Active section is tracked with IntersectionObserver.
 * Hidden on screens smaller than lg (1024 px).
 */
export function ArtworkTimelineNav({ artworks }: Props) {
  // -1 = hero/top region; 0…n-1 = artwork index
  const [activeIndex, setActiveIndex] = useState(-1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset to hero if the user scrolls back near the top
    const onScroll = () => {
      if (window.scrollY < 250) setActiveIndex(-1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Observe each artwork section; whichever crosses the narrow centre band
    // of the viewport becomes active.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const raw = entry.target.id.replace("artwork-", "");
            const idx = Number(raw);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      {
        // Narrow horizontal band in the vertical centre of the viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    artworks.forEach((_, i) => {
      const el = document.getElementById(`artwork-${i}`);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [artworks]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToArtwork = (i: number) =>
    document.getElementById(`artwork-${i}`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center"
      role="navigation"
      aria-label="Artwork sections"
    >
      {/* Vertical connecting line behind all dots */}
      <div className="pointer-events-none relative flex flex-col items-center">
        <div
          className="absolute inset-x-0 mx-auto w-px bg-white/12"
          style={{ top: 12, bottom: 12 }}
          aria-hidden
        />

        {/* Hero / top dot */}
        <div className="group relative flex items-center py-[7px]">
          <button
            type="button"
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className={[
              "relative z-[1] rounded-full transition-all duration-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              activeIndex === -1
                ? "h-2.5 w-2.5 bg-white opacity-100 scale-110"
                : "h-2 w-2 bg-white/30 hover:bg-white/65",
            ].join(" ")}
          />
          {/* Tooltip */}
          <span
            className="pointer-events-none absolute left-5 whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-white/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden
          >
            Top
          </span>
        </div>

        {/* One dot per artwork */}
        {artworks.map((work, i) => (
          <div key={`tnav-${i}`} className="group relative flex items-center py-[7px]">
            <button
              type="button"
              aria-label={work.title}
              onClick={() => scrollToArtwork(i)}
              className={[
                "relative z-[1] rounded-full transition-all duration-300",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                activeIndex === i
                  ? "h-2.5 w-2.5 bg-white opacity-100 scale-110"
                  : "h-2 w-2 bg-white/30 hover:bg-white/65",
              ].join(" ")}
            />
            {/* Tooltip — appears to the right on hover */}
            <span
              className="pointer-events-none absolute left-5 max-w-[140px] truncate whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-white/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden
            >
              {work.title}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}
