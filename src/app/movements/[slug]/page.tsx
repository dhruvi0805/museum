import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artMovements, getAllMovementSlugs, getArtMovementBySlug } from "@/data/movements";
import { MovementPageClient } from "@/components/movements/MovementPageClient";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function resolveParams(params: PageProps["params"]) {
  return await Promise.resolve(params);
}

export function generateStaticParams() {
  return getAllMovementSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const movement = getArtMovementBySlug(slug);
  if (!movement) {
    return { title: "Movement | Museum Chronology" };
  }
  return {
    title: `${movement.title} | Museum Chronology`,
    description: movement.description,
  };
}

export default async function MovementPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);
  const movement = getArtMovementBySlug(slug);
  if (!movement) {
    notFound();
  }

  const eraIndex = artMovements.findIndex((e) => e.slug === movement.slug);
  const prev = eraIndex > 0 ? artMovements[eraIndex - 1] : null;
  const next = eraIndex >= 0 && eraIndex < artMovements.length - 1 ? artMovements[eraIndex + 1] : null;

  return <MovementPageClient movement={movement} eraIndex={eraIndex} prev={prev} next={next} />;
}
