import type { ArtEra, CanonicalArtwork } from "@/lib/eraTypes";

export type MovementBannerSlide = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * Optional per-slug slides from `public/movements/<slug>/` (paths start with `/movements/...`).
 * When a slug has a non-empty array here, the banner uses these instead of collection artwork URLs.
 *
 * To add local assets: place files under `public/movements/<slug>/` and register them here.
 */
export const movementBannerLocalBySlug: Partial<Record<string, MovementBannerSlide[]>> = {};

function artworkToSlide(work: CanonicalArtwork): MovementBannerSlide {
  return {
    src: work.imageUrl,
    alt: `${work.title} by ${work.artist}`,
  };
}

export function getMovementBannerSlides(movement: ArtEra): MovementBannerSlide[] {
  const local = movementBannerLocalBySlug[movement.slug];
  if (local && local.length > 0) {
    return local;
  }
  return movement.artworks.map(artworkToSlide);
}
