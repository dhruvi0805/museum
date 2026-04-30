const museumData = [
  {
    id: 1,
    title: "Ancient Art",
    period: "30,000 BCE – 400 CE",
    description:
      "The earliest known artistic expressions—cave paintings, fertility figures, and monumental architecture—emerged as humanity sought to make meaning from the world. Egyptian hieroglyphs, Greek sculptures, and Roman frescoes established visual languages still echoing today.",
    imagePlaceholder: "I",
    accent: "#1a1a1a",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/1280px-Lascaux_painting.jpg",
    slug: "ancient-art",
    highlights: [
      "Cave paintings of Lascaux (~17,000 BCE)",
      "Venus of Willendorf (~25,000 BCE)",
      "Egyptian Book of the Dead papyrus",
      "Classical Greek sculpture: Discobolus",
      "Roman Pompeii wall frescoes",
    ],
    facts: {
      medium: "Stone, pigment, bronze, fresco",
      geography: "Africa, Europe, Near East, Asia",
      keyFigures: "Phidias, Praxiteles",
    },
  },
  {
    id: 2,
    title: "Medieval Art",
    period: "400 – 1400 CE",
    description:
      "Dominated by religious iconography and manuscript illumination, medieval art prioritized spiritual meaning over naturalistic representation. Gothic cathedrals became total works of art—architecture, sculpture, and stained glass unified in devotional purpose.",
    imagePlaceholder: "II",
    accent: "#2a2a2a",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Lorenzetti_amb.effect2.jpg/960px-Lorenzetti_amb.effect2.jpg",
    slug: "medieval-art",
    highlights: [
      "Book of Kells illuminated manuscript (~800 CE)",
      "Bayeux Tapestry (1070s)",
      "Notre-Dame de Paris rose windows",
      "Giotto's Arena Chapel frescoes (1304–06)",
      "Byzantine mosaics of Ravenna",
    ],
    facts: {
      medium: "Tempera, gold leaf, stained glass, fresco",
      geography: "Europe, Byzantium",
      keyFigures: "Giotto di Bondone, Hildegard of Bingen",
    },
  },
  {
    id: 3,
    title: "Renaissance",
    period: "1400 – 1600 CE",
    description:
      "A rebirth of classical learning, the Renaissance placed human experience at the center of art. Linear perspective, anatomy, and the ideal of the 'universal man' transformed painting and sculpture into intellectual pursuits as rigorous as science.",
    imagePlaceholder: "III",
    accent: "#333333",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    slug: "renaissance",
    highlights: [
      "Botticelli — Birth of Venus (1484–86)",
      "Leonardo — The Last Supper (1495–98)",
      "Michelangelo — Sistine Chapel ceiling (1508–12)",
      "Raphael — School of Athens (1509–11)",
      "Dürer's self-portraits and woodcuts",
    ],
    facts: {
      medium: "Oil on canvas/panel, marble, fresco",
      geography: "Italy, Flanders, Germany",
      keyFigures: "Leonardo, Michelangelo, Raphael, Titian",
    },
  },
  {
    id: 4,
    title: "Baroque & Rococo",
    period: "1600 – 1750 CE",
    description:
      "Baroque art deployed dramatic light, intense emotion, and dynamic movement to engage viewers viscerally—often in service of the Catholic Church's Counter-Reformation. Rococo followed as a lighter, more playful aristocratic style of ornamental excess.",
    imagePlaceholder: "IV",
    accent: "#3d3d3d",
    bgImage: "https://www.invaluable.com/blog/wp-content/uploads/sites/77/2018/06/Wikimedia-Watteau-Edited-670x450.jpg",
    slug: "baroque-rococo",
    highlights: [
      "Caravaggio — Calling of St. Matthew (1599–1600)",
      "Rembrandt — Night Watch (1642)",
      "Vermeer — Girl with a Pearl Earring (~1665)",
      "Bernini — Ecstasy of Saint Teresa (1647–52)",
      "Watteau — Pilgrimage to Cythera (1717)",
    ],
    facts: {
      medium: "Oil on canvas, marble, gilt stucco",
      geography: "Italy, Netherlands, France, Spain",
      keyFigures: "Caravaggio, Rembrandt, Bernini, Watteau",
    },
  },
  {
    id: 5,
    title: "Neoclassicism & Romanticism",
    period: "1750 – 1850 CE",
    description:
      "Neoclassicism returned to Greco-Roman ideals of order and reason amid Enlightenment philosophy. Romanticism reacted with emotion, the sublime landscape, and the individual imagination—setting the stage for all modern art movements.",
    imagePlaceholder: "V",
    accent: "#474747",
    bgImage: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/435922/797343/main-image",
    slug: "neoclassicism-romanticism",
    highlights: [
      "David — Oath of the Horatii (1784)",
      "Goya — Saturn Devouring His Son (1819–23)",
      "Géricault — Raft of the Medusa (1818–19)",
      "Delacroix — Liberty Leading the People (1830)",
      "Turner — Rain, Steam and Speed (1844)",
    ],
    facts: {
      medium: "Oil on canvas, marble",
      geography: "France, England, Spain",
      keyFigures: "David, Goya, Turner, Delacroix",
    },
  },
  {
    id: 6,
    title: "Impressionism & Post-Impressionism",
    period: "1860 – 1910 CE",
    description:
      "Abandoning studio conventions, Impressionists painted outdoors capturing fleeting light and atmosphere. Their successors pushed further—Cézanne toward structure, Van Gogh toward emotion, Gauguin toward the primitive—laying every foundation for 20th-century modernism.",
    imagePlaceholder: "VI",
    accent: "#555",
    bgImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/960px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
    slug: "impressionism",
    highlights: [
      "Monet — Impression, Sunrise (1872)",
      "Renoir — Luncheon of the Boating Party (1880–81)",
      "Degas — Dance Class series",
      "Van Gogh — Starry Night (1889)",
      "Cézanne — Mont Sainte-Victoire series",
      "Seurat — A Sunday on La Grande Jatte (1884–86)",
    ],
    facts: {
      medium: "Oil on canvas, pastel",
      geography: "France",
      keyFigures: "Monet, Renoir, Degas, Van Gogh, Cézanne",
    },
  },
  {
    id: 7,
    title: "Modern Art",
    period: "1905 – 1960 CE",
    description:
      "A radical rupture with tradition—Cubism shattered form, Surrealism probed the unconscious, Abstract Expressionism evacuated all figuration. This was art as philosophy, psychology, and political resistance compressed into paint and steel.",
    imagePlaceholder: "VII",
    accent: "#222",
    bgImage: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    slug: "modern-art",
    highlights: [
      "Picasso — Les Demoiselles d'Avignon (1907)",
      "Duchamp — Fountain (1917)",
      "Mondrian — Composition with Red, Blue and Yellow (1930)",
      "Dalí — The Persistence of Memory (1931)",
      "Pollock — No. 31 (1950)",
      "Rothko — Seagram Murals (1958–59)",
    ],
    facts: {
      medium: "Oil, collage, readymades, enamel",
      geography: "France, USA, Germany",
      keyFigures: "Picasso, Duchamp, Pollock, Rothko, Dalí",
    },
  },
  {
    id: 8,
    title: "Contemporary Art",
    period: "1960 – Present",
    description:
      "Contemporary art resists definition by design. Conceptualism, video, installation, performance, digital media, and social practice all coexist. Art is now a global, plural conversation about identity, power, environment, and technology.",
    imagePlaceholder: "VIII",
    accent: "#111",
    bgImage: "https://cdn.sanity.io/images/476nwnl9/production/39bda21b17b16ea08c36caacee62c5792b698477-5566x3426.jpg?auto=format&fit=crop&h=667&rect=0%2C0%2C5566%2C1856&w=2000",
    slug: "contemporary-art",
    highlights: [
      "Warhol — Marilyn Diptych (1962)",
      "Basquiat — Untitled (1982)",
      "Koons — Balloon Dog (1994–2000)",
      "Hirst — The Physical Impossibility of Death… (1991)",
      "Kusama — Infinity Mirror Rooms",
      "Ai Weiwei — Sunflower Seeds (2010)",
    ],
    facts: {
      medium: "Everything: video, neon, steel, data, bodies",
      geography: "Global",
      keyFigures: "Warhol, Basquiat, Hirst, Koons, Kusama, Ai Weiwei",
    },
  },
];

const facetBySlug = {
  "ancient-art": "ancient",
  "medieval-art": "medieval",
  renaissance: "early-modern",
  "baroque-rococo": "early-modern",
  "neoclassicism-romanticism": "modernism",
  impressionism: "modernism",
  "modern-art": "mid-century",
  "contemporary-art": "postmodern",
};

const moodBySlug = {
  "ancient-art": "Ritual and symbolic",
  "medieval-art": "Sacred and devotional",
  renaissance: "Humanist and analytical",
  "baroque-rococo": "Theatrical and ornamental",
  "neoclassicism-romanticism": "Reason versus emotion",
  impressionism: "Atmospheric and fleeting",
  "modern-art": "Experimental and disruptive",
  "contemporary-art": "Plural and critical",
};

museumData.forEach((era) => {
  era.filterFacet = facetBySlug[era.slug] || "modernism";
  era.searchTags = [era.title, era.period, era.facts.medium, era.facts.keyFigures];
  era.heroSubtitle = `${era.title} explores ${moodBySlug[era.slug] || "cultural transformation"} across ${era.period}.`;
  era.visualMood = moodBySlug[era.slug] || "Contextual and reflective";
  era.objects = (era.highlights || []).slice(0, 3).map((item, index) => ({
    title: item,
    artist: item.split("—")[0]?.trim() || era.facts.keyFigures.split(",")[0]?.trim() || "Unknown",
    date: era.period,
    medium: era.facts.medium,
    context: `${era.title} reveals changing visual values across this period.`,
    story: `Object ${index + 1} reflects how artists in ${era.title} framed society, belief, and innovation.`,
  }));
  era.compareTags = [era.filterFacet, era.visualMood];
});
