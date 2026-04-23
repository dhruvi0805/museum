export type MuseumObject = {
  title: string;
  artist: string;
  date: string;
  medium: string;
  context: string;
  story: string;
};

export type ArtEra = {
  id: number;
  slug: string;
  title: string;
  period: string;
  description: string;
  heroSubtitle: string;
  visualMood: string;
  bgImage: string;
  highlights: string[];
  searchTags: string[];
  filterFacet: "ancient" | "medieval" | "early-modern" | "mid-century" | "modernism" | "postmodern";
  facts: {
    medium: string;
    geography: string;
    keyFigures: string;
  };
  objects: MuseumObject[];
};

export const artMovements: ArtEra[] = [
  {
    id: 1,
    slug: "ancient-art",
    title: "Ancient Art",
    period: "30,000 BCE – 400 CE",
    description: "The earliest known artistic expressions—cave paintings, fertility figures, and monumental architecture—emerged as humanity sought to make meaning from the world.",
    heroSubtitle: "Ancient Art explores ritual and symbolic expression across early civilizations.",
    visualMood: "Ritual and symbolic",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/1280px-Lascaux_painting.jpg",
    filterFacet: "ancient",
    searchTags: ["lascaux", "greek", "roman", "phidias"],
    highlights: ["Cave paintings of Lascaux", "Venus of Willendorf", "Discobolus", "Pompeii frescoes"],
    facts: { medium: "Stone, pigment, bronze, fresco", geography: "Africa, Europe, Near East, Asia", keyFigures: "Phidias, Praxiteles" },
    objects: [
      { title: "Cave paintings of Lascaux", artist: "Unknown", date: "~17,000 BCE", medium: "Pigment on cave wall", context: "Early symbolic narrative", story: "Marks one of the earliest known image systems." },
      { title: "Venus of Willendorf", artist: "Unknown", date: "~25,000 BCE", medium: "Limestone", context: "Portable ritual object", story: "Shows an abstracted focus on fertility and body symbolism." },
      { title: "Discobolus", artist: "Myron", date: "Classical period", medium: "Marble and bronze copies", context: "Greek ideal proportion", story: "Captures athletic movement and mathematical harmony." },
    ],
  },
  {
    id: 2, slug: "medieval-art", title: "Medieval Art", period: "400 – 1400 CE",
    description: "Dominated by religious iconography and manuscript illumination, medieval art prioritized spiritual meaning over naturalistic representation.",
    heroSubtitle: "Medieval Art explores sacred and devotional image-making through churches and manuscripts.",
    visualMood: "Sacred and devotional",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GoldenHaggadahPlague.jpg/1280px-GoldenHaggadahPlague.jpg",
    filterFacet: "medieval", searchTags: ["book of kells", "gothic", "ravenna"],
    highlights: ["Book of Kells", "Bayeux Tapestry", "Notre-Dame rose windows", "Byzantine mosaics"],
    facts: { medium: "Tempera, gold leaf, stained glass, fresco", geography: "Europe, Byzantium", keyFigures: "Giotto di Bondone" },
    objects: [
      { title: "Book of Kells", artist: "Monastic artists", date: "~800 CE", medium: "Illuminated manuscript", context: "Insular Christian art", story: "Combines calligraphy and ornate symbolic ornament." },
      { title: "Bayeux Tapestry", artist: "Workshop unknown", date: "1070s", medium: "Embroidery", context: "Narrative record", story: "Chronicles political conquest through sequential scenes." },
      { title: "Ravenna mosaics", artist: "Byzantine workshops", date: "6th century", medium: "Glass mosaic", context: "Liturgical interiors", story: "Uses gold-ground light to suggest spiritual presence." },
    ],
  },
  {
    id: 3, slug: "renaissance", title: "Renaissance", period: "1400 – 1600 CE",
    description: "A rebirth of classical learning, the Renaissance placed human experience at the center of art.",
    heroSubtitle: "Renaissance explores humanist and analytical approaches to perspective and anatomy.",
    visualMood: "Humanist and analytical",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    filterFacet: "early-modern", searchTags: ["leonardo", "michelangelo", "raphael"],
    highlights: ["Birth of Venus", "The Last Supper", "Sistine Chapel ceiling", "School of Athens"],
    facts: { medium: "Oil on canvas/panel, marble, fresco", geography: "Italy, Flanders, Germany", keyFigures: "Leonardo, Michelangelo, Raphael, Titian" },
    objects: [
      { title: "Birth of Venus", artist: "Sandro Botticelli", date: "1484–86", medium: "Tempera on canvas", context: "Myth revived via humanism", story: "Mythic narrative and idealized body return to center stage." },
      { title: "The Last Supper", artist: "Leonardo da Vinci", date: "1495–98", medium: "Mural", context: "Perspective as theology", story: "Spatial geometry orchestrates emotional drama." },
      { title: "School of Athens", artist: "Raphael", date: "1509–11", medium: "Fresco", context: "Classical philosophy", story: "Assembles ancient thinkers within an ideal architectural order." },
    ],
  },
  {
    id: 4, slug: "baroque-rococo", title: "Baroque & Rococo", period: "1600 – 1750 CE",
    description: "Baroque art deployed dramatic light, intense emotion, and dynamic movement to engage viewers viscerally.",
    heroSubtitle: "Baroque and Rococo explore theatrical and ornamental visual spectacle.",
    visualMood: "Theatrical and ornamental",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/1280px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
    filterFacet: "early-modern", searchTags: ["caravaggio", "rembrandt", "vermeer"],
    highlights: ["Calling of St. Matthew", "Night Watch", "Girl with a Pearl Earring", "Ecstasy of Saint Teresa"],
    facts: { medium: "Oil on canvas, marble, gilt stucco", geography: "Italy, Netherlands, France, Spain", keyFigures: "Caravaggio, Rembrandt, Bernini, Watteau" },
    objects: [
      { title: "Calling of St. Matthew", artist: "Caravaggio", date: "1599–1600", medium: "Oil on canvas", context: "Chiaroscuro drama", story: "Light slices through darkness to stage conversion." },
      { title: "Night Watch", artist: "Rembrandt", date: "1642", medium: "Oil on canvas", context: "Civic portraiture", story: "Transforms group portrait into kinetic narrative." },
      { title: "Ecstasy of Saint Teresa", artist: "Gian Lorenzo Bernini", date: "1647–52", medium: "Marble", context: "Counter-Reformation theatrics", story: "Sculpture becomes staged spiritual performance." },
    ],
  },
  {
    id: 5, slug: "neoclassicism-romanticism", title: "Neoclassicism & Romanticism", period: "1750 – 1850 CE",
    description: "Neoclassicism returned to Greco-Roman ideals while Romanticism reacted with emotion and sublime nature.",
    heroSubtitle: "This era explores reason versus emotion in modern European painting.",
    visualMood: "Reason versus emotion",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/1280px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    filterFacet: "modernism", searchTags: ["goya", "turner", "delacroix"],
    highlights: ["Oath of the Horatii", "Saturn Devouring His Son", "Liberty Leading the People", "Rain, Steam and Speed"],
    facts: { medium: "Oil on canvas, marble", geography: "France, England, Spain", keyFigures: "David, Goya, Turner, Delacroix" },
    objects: [
      { title: "Oath of the Horatii", artist: "Jacques-Louis David", date: "1784", medium: "Oil on canvas", context: "Civic virtue", story: "Presents idealized sacrifice through severe geometry." },
      { title: "Liberty Leading the People", artist: "Eugène Delacroix", date: "1830", medium: "Oil on canvas", context: "Political revolution", story: "Turns revolution into allegorical momentum." },
      { title: "Rain, Steam and Speed", artist: "J.M.W. Turner", date: "1844", medium: "Oil on canvas", context: "Industrial sublime", story: "Atmospheric blur anticipates modern perception." },
    ],
  },
  {
    id: 6, slug: "impressionism", title: "Impressionism & Post-Impressionism", period: "1860 – 1910 CE",
    description: "Impressionists painted outdoors capturing fleeting light; successors pushed structure and emotion.",
    heroSubtitle: "This era explores atmospheric and fleeting perception in modern painting.",
    visualMood: "Atmospheric and fleeting",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet%2C_The_Water-Lily_Pond%2C_1906%2C_The_Art_Institute_of_Chicago.jpg/1280px-Claude_Monet%2C_The_Water-Lily_Pond%2C_1906%2C_The_Art_Institute_of_Chicago.jpg",
    filterFacet: "modernism", searchTags: ["monet", "van gogh", "cezanne"],
    highlights: ["Impression, Sunrise", "Luncheon of the Boating Party", "Starry Night", "La Grande Jatte"],
    facts: { medium: "Oil on canvas, pastel", geography: "France", keyFigures: "Monet, Renoir, Degas, Van Gogh, Cézanne" },
    objects: [
      { title: "Impression, Sunrise", artist: "Claude Monet", date: "1872", medium: "Oil on canvas", context: "Name-giving image", story: "Captures transient color and light over precise form." },
      { title: "Starry Night", artist: "Vincent van Gogh", date: "1889", medium: "Oil on canvas", context: "Expressive brushwork", story: "Emotion drives line and color into a turbulent sky." },
      { title: "La Grande Jatte", artist: "Georges Seurat", date: "1884–86", medium: "Oil on canvas", context: "Optical science", story: "Builds modern leisure through methodical points of color." },
    ],
  },
  {
    id: 7, slug: "modern-art", title: "Modern Art", period: "1905 – 1960 CE",
    description: "A radical rupture with tradition where Cubism, Surrealism, and abstraction redefined visual language.",
    heroSubtitle: "Modern Art explores experimental and disruptive forms of representation.",
    visualMood: "Experimental and disruptive",
    bgImage: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    filterFacet: "mid-century", searchTags: ["picasso", "dali", "pollock", "bauhaus"],
    highlights: ["Les Demoiselles d'Avignon", "Fountain", "The Persistence of Memory", "No. 31"],
    facts: { medium: "Oil, collage, readymades, enamel", geography: "France, USA, Germany", keyFigures: "Picasso, Duchamp, Pollock, Rothko, Dalí" },
    objects: [
      { title: "Les Demoiselles d'Avignon", artist: "Pablo Picasso", date: "1907", medium: "Oil on canvas", context: "Proto-Cubism", story: "Fractures anatomy and perspective into planar confrontation." },
      { title: "Fountain", artist: "Marcel Duchamp", date: "1917", medium: "Readymade", context: "Institutional critique", story: "Reframes authorship and objecthood in art." },
      { title: "The Persistence of Memory", artist: "Salvador Dalí", date: "1931", medium: "Oil on canvas", context: "Surreal dream logic", story: "Soft clocks challenge rational perception of time." },
    ],
  },
  {
    id: 8, slug: "contemporary-art", title: "Contemporary Art", period: "1960 – Present",
    description: "Conceptual, installation, performance, and digital practices coexist in a global conversation.",
    heroSubtitle: "Contemporary Art explores plural and critical approaches to image, identity, and systems.",
    visualMood: "Plural and critical",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kusama_at_her_studio.jpg/1280px-Kusama_at_her_studio.jpg",
    filterFacet: "postmodern", searchTags: ["warhol", "kusama", "ai weiwei"],
    highlights: ["Marilyn Diptych", "Untitled (Basquiat)", "Infinity Mirror Rooms", "Sunflower Seeds"],
    facts: { medium: "Video, neon, steel, data, performance", geography: "Global", keyFigures: "Warhol, Basquiat, Hirst, Koons, Kusama, Ai Weiwei" },
    objects: [
      { title: "Marilyn Diptych", artist: "Andy Warhol", date: "1962", medium: "Silkscreen ink", context: "Mass media repetition", story: "Turns celebrity into serial icon and critique." },
      { title: "Infinity Mirror Rooms", artist: "Yayoi Kusama", date: "1965–present", medium: "Installation", context: "Immersive subjectivity", story: "Expands self and space through infinite reflection." },
      { title: "Sunflower Seeds", artist: "Ai Weiwei", date: "2010", medium: "Porcelain installation", context: "Collective labor", story: "Transforms hand-made repetition into political commentary." },
    ],
  },
];
