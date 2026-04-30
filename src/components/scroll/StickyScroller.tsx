"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import type { ArtEra } from "@/data/movements";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/scroll/ScrollProgress";
import { Slide } from "@/components/scroll/Slide";
import { SlideContent } from "@/components/scroll/SlideContent";

type StickyScrollerProps = {
  slides: ArtEra[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function StickyScroller({ slides }: StickyScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = clamp(Math.floor(value * slides.length), 0, slides.length - 1);
    setActiveIndex(next);
  });

  const activeSlide = slides[activeIndex];
  const scrollHeight = useMemo(() => `${slides.length * 100}vh`, [slides.length]);

  const scrollToIndex = (index: number) => {
    const target = containerRef.current;
    if (!target) return;
    const top = target.offsetTop + index * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToIndex(clamp(activeIndex + 1, 0, slides.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToIndex(clamp(activeIndex - 1, 0, slides.length - 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, slides.length]);

  return (
    <div ref={containerRef} className="relative" style={{ height: scrollHeight }}>
      <NavBar elevated={activeIndex > 0} />
      <ScrollProgress
        count={slides.length}
        activeIndex={activeIndex}
        onSelect={scrollToIndex}
      />
      <Slide>
        <div className="absolute inset-0 -z-20">
          <div
            className="h-full w-full bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${activeSlide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/25 to-black/70" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <SlideContent slide={activeSlide} activeIndex={activeIndex} />
        </div>
      </Slide>
    </div>
  );
}
