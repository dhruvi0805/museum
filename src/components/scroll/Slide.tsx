import type { ReactNode } from "react";

type SlideProps = {
  children: ReactNode;
};

export function Slide({ children }: SlideProps) {
  return (
    <section
      className="sticky top-0 flex h-screen items-center"
      aria-live="polite"
    >
      {children}
    </section>
  );
}
