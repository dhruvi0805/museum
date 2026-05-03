import type { ArtEra, CanonicalArtwork } from "./eraTypes";

export function getArtistBlurb(era: ArtEra, work: CanonicalArtwork): string {
  if (work.artistId && era.artists?.[work.artistId]) {
    return era.artists[work.artistId].blurb;
  }
  return `${work.artist} worked within the visual world of ${era.title}, leaving a mark on how we read art from ${work.date}.`;
}
