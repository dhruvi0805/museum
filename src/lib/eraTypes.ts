export type FilterFacet = "ancient" | "medieval" | "early-modern" | "mid-century" | "modernism" | "postmodern";

export type ArtworkAttribution = {
  creditLine: string;
  sourceUrl: string;
  license: string;
};

export type CanonicalArtwork = {
  title: string;
  artist: string;
  /** Key into era `artists` map for shared biographical blurb */
  artistId?: string;
  date: string;
  imageUrl: string;
  keyFeatures: string[];
  workBlurb: string;
  attribution: ArtworkAttribution;
};

export type ArtistBio = {
  blurb: string;
};

export type MuseumObject = {
  title: string;
  artist: string;
  date: string;
  medium: string;
  context: string;
  story: string;
};

/** Raw shape stored in content/eras.json */
export type CanonicalEra = {
  id: number;
  slug: string;
  title: string;
  period: string;
  description: string;
  heroSubtitle: string;
  visualMood: string;
  bgImage: string;
  imagePlaceholder: string;
  highlights: string[];
  searchTags: string[];
  filterFacet: FilterFacet;
  facts: {
    medium: string;
    geography: string;
    keyFigures: string;
  };
  artists?: Record<string, ArtistBio>;
  artworks: CanonicalArtwork[];
};

export type ArtEra = CanonicalEra & {
  compareTags: string[];
  objects: MuseumObject[];
};
