"use strict";

function artworksToObjects(era) {
  return era.artworks.slice(0, 3).map((a) => ({
    title: a.title,
    artist: a.artist,
    date: a.date,
    medium: a.keyFeatures[0] ?? "—",
    context: `${a.title} (${era.title})`,
    story: a.workBlurb,
  }));
}

function normalizeEra(era) {
  const compareTags = [era.filterFacet, era.visualMood];
  const objects = artworksToObjects(era);
  return { ...era, compareTags, objects };
}

function normalizeEras(eras) {
  return eras.map(normalizeEra);
}

module.exports = { normalizeEra, normalizeEras };
