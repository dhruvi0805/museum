import type { ReactNode } from "react";

/**
 * Movement detail routes: strict dark canvas (#000 / #fff) without changing spacing or component structure.
 */
export default function MovementSectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black font-sans text-white [--movement-muted:rgba(255,255,255,0.7)]">
      {children}
    </div>
  );
}
