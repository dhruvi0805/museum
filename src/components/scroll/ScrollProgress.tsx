type ScrollProgressProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ScrollProgress({
  count,
  activeIndex,
  onSelect,
}: ScrollProgressProps) {
  return (
    <nav
      aria-label="Slide progress"
      className="fixed right-5 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3"
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={`h-3 w-3 rounded-full border border-white/70 transition ${
              isActive ? "scale-110 bg-white" : "bg-transparent hover:bg-white/40"
            }`}
          />
        );
      })}
    </nav>
  );
}
