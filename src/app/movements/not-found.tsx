import Link from "next/link";

export default function MovementNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-black p-6 text-white">
      <div className="space-y-4 text-center">
        <p className="text-7xl font-semibold tracking-[-0.04em] text-white/30">404</p>
        <p className="text-xs uppercase tracking-[0.16em] text-white">Movement not found</p>
        <Link
          href="/"
          className="inline-flex rounded-md border border-white/35 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Return to timeline
        </Link>
      </div>
    </main>
  );
}
