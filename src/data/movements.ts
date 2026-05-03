import type { ArtEra, CanonicalEra } from "@/lib/eraTypes";
import { normalizeEras } from "@/lib/eraNormalize";
import raw from "../../content/eras.json";

export type {
  ArtEra,
  CanonicalArtwork,
  MuseumObject,
  ArtistBio,
  ArtworkAttribution,
  FilterFacet,
} from "@/lib/eraTypes";

export const artMovements = normalizeEras(raw.eras as unknown as CanonicalEra[]);

export function getArtMovementBySlug(slug: string): ArtEra | undefined {
  return artMovements.find((e) => e.slug === slug);
}

export function getAllMovementSlugs(): string[] {
  return artMovements.map((e) => e.slug);
}
