import type { ArtEra, CanonicalEra, MuseumObject } from "./eraTypes";

function artworksToObjects(era: CanonicalEra): MuseumObject[] {
  return era.artworks.slice(0, 3).map((a) => ({
    title: a.title,
    artist: a.artist,
    date: a.date,
    medium: a.keyFeatures[0] ?? "—",
    context: `${a.title} (${era.title})`,
    story: a.workBlurb,
  }));
}

export function normalizeEra(era: CanonicalEra): ArtEra {
  const compareTags = [era.filterFacet, era.visualMood];
  const objects = artworksToObjects(era);
  return { ...era, compareTags, objects };
}

export function normalizeEras(eras: CanonicalEra[]): ArtEra[] {
  return eras.map(normalizeEra);
}
