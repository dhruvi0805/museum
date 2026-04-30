"use client";

import Link from "next/link";

type NavBarProps = {
  elevated: boolean;
};

export function NavBar({ elevated }: NavBarProps) {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        elevated ? "bg-[#141414]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">
          Museum Chronology
        </p>
        <Link
          href="/compare"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75 hover:text-white"
        >
          Compare
        </Link>
      </div>
    </header>
  );
}
