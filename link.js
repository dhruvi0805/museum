const axios = require("axios");
const fs = require("fs");

const MET_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";
const MET_OBJECT = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

const artworks = [
  "Augustus of Prima Porta",
  "Standard of Ur",
  "Code of Hammurabi stele",
  "Alexander Mosaic",
  "Villa of the Mysteries Pompeii",
  "Book of Kells",
  "Bayeux Tapestry",
  "Arena Chapel Lamentation Giotto",
  "Chartres Cathedral north rose window",
  "Christ Pantocrator Monreale",
  "Empress Theodora San Vitale Ravenna",
  "Sutton Hoo helmet reconstruction",
  "Ostromir Gospels evangelist",
  "Birth of Venus Botticelli",
  "Creation of Adam Michelangelo",
  "Albrecht Dürer self portrait 28",
  "David Michelangelo",
  "Giorgione The Tempest",
  "Assumption of the Virgin Titian",
  "Calling of Saint Matthew Caravaggio",
  "Ecstasy of Saint Teresa Bernini",
  "Las Meninas Velazquez",
  "Judith Slaying Holofernes Artemisia Gentileschi",
  "Descent from the Cross Rubens",
  "Pilgrimage to Cythera Watteau",
  "Return of the Prodigal Son Rembrandt",
  "Oath of the Horatii David",
  "Death of Marat Jacques-Louis David",
  "Raft of the Medusa Gericault",
  "Rain Steam and Speed Turner",
  "Third of May 1808 Goya",
  "Saturn Devouring His Son Goya",
  "Grande Odalisque Ingres",
  "Monk by the Sea Caspar David Friedrich",
  "Bal du moulin de la Galette Renoir",
  "Ballet Class Degas",
  "Sunday on La Grande Jatte Seurat",
  "Water Lilies Monet",
  "Mont Sainte-Victoire Cezanne",
  "Olympia Manet",
  "At the Moulin Rouge Toulouse Lautrec",
  "The Child's Bath Mary Cassatt",
  "Fountain Marcel Duchamp",
  "Broadway Boogie Woogie Mondrian",
  "Composition VII Kandinsky",
  "Dance (I) Matisse",
  "Autumn Rhythm Jackson Pollock",
  "Orange Red Yellow Rothko",
  "Marilyn Diptych Warhol",
  "Infinity Mirror Room Yayoi Kusama",
  "Sunflower Seeds Ai Weiwei",
  "Untitled Skull Basquiat",
  "The Physical Impossibility of Death Damien Hirst",
  "Balloon Dog Jeff Koons",
  "Cloud Gate Anish Kapoor",
  "Untitled Film Still 21 Cindy Sherman",
  "Maman Louise Bourgeois",
  "LOVE sculpture Robert Indiana"
];

async function searchMet(query) {
  try {
    const res = await axios.get(MET_SEARCH, {
      params: { q: query }
    });

    if (!res.data.objectIDs || res.data.objectIDs.length === 0) return null;

    const objectId = res.data.objectIDs[0];
    const obj = await axios.get(MET_OBJECT + objectId);

    const data = obj.data;

    if (!data.primaryImage) return null;

    return {
      title: data.title,
      artist: data.artistDisplayName,
      image: data.primaryImage,
      source: data.objectURL
    };
  } catch (e) {
    return null;
  }
}

// fallback for non-Met works
async function fallbackWikipedia(query) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await axios.get(url);

    if (!res.data.thumbnail) return null;

    return {
      title: res.data.title,
      artist: "unknown",
      image: res.data.thumbnail.source,
      source: res.data.content_urls.desktop.page
    };
  } catch (e) {
    return null;
  }
}

async function run() {
  const results = [];

  for (const art of artworks) {
    console.log("Fetching:", art);

    let data = await searchMet(art);

    if (!data) {
      data = await fallbackWikipedia(art);
    }

    if (data) {
      results.push({
        query: art,
        title: data.title,
        artist: data.artist,
        image_url: data.image,
        source_url: data.source
      });
    } else {
      results.push({
        query: art,
        error: "not found"
      });
    }
  }

  fs.writeFileSync("artworks.json", JSON.stringify(results, null, 2));
  console.log("Done → artworks.json created");
}

run();
