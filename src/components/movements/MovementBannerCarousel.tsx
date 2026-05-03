"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type TouchEvent } from "react";
import type { MovementBannerSlide } from "@/lib/movementBanner";

type MovementBannerCarouselProps = {
  slides: MovementBannerSlide[];
  label: string;
};

export function MovementBannerCarousel({ slides, label }: MovementBannerCarouselProps) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const count = slides.length;
  const safeIndex = count > 0 ? Math.min(index, count - 1) : 0;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
    },
    [count],
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(safeIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(safeIndex + 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        go(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        go(count - 1);
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [count, go, safeIndex]);

  if (count === 0) {
    return null;
  }

  const transitionClass = reduceMotion ? "" : "transition-transform duration-500 ease-out";

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null || count < 2) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(safeIndex + 1);
    else go(safeIndex - 1);
  };

  return (
    <div
      ref={regionRef}
      className="relative h-full w-full touch-pan-y outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={`flex h-full ${transitionClass}`}
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={`${slide.src}-${i}`} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[2] flex items-center justify-center gap-2 px-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2 py-1.5 backdrop-blur-md">
          {slides.map((_, dotIndex) => {
            const selected = dotIndex === safeIndex;
            return (
              <button
                key={`${id}-dot-${dotIndex}`}
                type="button"
                aria-label={`Slide ${dotIndex + 1} of ${count}`}
                aria-current={selected ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  selected ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                onClick={() => go(dotIndex)}
              />
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={() => go(safeIndex - 1)}
      >
        Prev
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={() => go(safeIndex + 1)}
      >
        Next
      </button>
    </div>
  );
}
