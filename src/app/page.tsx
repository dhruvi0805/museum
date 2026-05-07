"use client";

import { artMovements } from "@/data/movements";
import { StickyScroller } from "@/components/scroll/StickyScroller";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <StickyScroller slides={artMovements} />
    </main>
  );
}
