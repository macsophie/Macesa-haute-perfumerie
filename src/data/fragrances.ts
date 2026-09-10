import { Fragrance, BoutiqueLocation } from '../types';

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'santal-imperial',
    name: 'Santal Impérial',
    frenchTitle: 'Extrait de Parfum — 32% Concentration',
    concentration: 'Extrait de Parfum',
    concentrationPercentage: '32% Pure Parfum',
    family: 'Woody & Amber',
    tagline: 'Smoked Australian sandalwood enrobed in velvet iris and golden cardamom.',
    shortDescription: 'A majestic architectural woody statement. Pure cream sandalwood blended with Florentine iris butter and ancient smoked cedarwood.',
    fullStory: 'Santal Impérial was composed as an ode to timeless grandeur. Beginning with a crystalline burst of green Guatemalan cardamom and violet leaves, the heart swiftly surrenders to rare Florentine Orris butter. The drydown unveils sustainably harvested Australian sandalwood, aged in French oak casks before undergoing our signature 120-day cold maceration.',
    perfumer: 'Laurent Delacroix, Maître Parfumeur',
    yearCreated: 2022,
    prices: { EUR: 295, USD: 320, GBP: 265 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Cardamom Coeur', description: 'Green spicy sparkle with cold-pressed clarity', origin: 'Alta Verapaz, Guatemala' },
        { name: 'Violet Leaves', description: 'Dewy mineral green accords', origin: 'Tourrettes-sur-Loup, France' },
        { name: 'Bergamot Reggio', description: 'Sun-drenched citrus brightness', origin: 'Calabria, Italy' }
      ],
      heart: [
        { name: 'Florentine Iris Butter', description: 'Extremely rare pallida root cured 3 years', origin: 'Florence, Italy' },
        { name: 'Atlas Cedarwood', description: 'Warm resinous pencil-shavings warmth', origin: 'Atlas Mountains, Morocco' },
        { name: 'Papyrus Extract', description: 'Dry smoked leather-like reed nuance', origin: 'Nile Delta, Egypt' }
      ],
      base: [
        { name: 'Australian Sandalwood', description: 'Milky, meditative creamy sacred wood', origin: 'Albany, Western Australia' },
        { name: 'Ambergris Tincture', description: 'Oceanic warmth and radiant skin tenacity', origin: 'Sustainably sourced beach-found' },
        { name: 'Bourbon Vanilla Bean', description: 'Smoky, non-sweet dark orchid pod', origin: 'Madagascar' }
      ]
    },
    longevity: '14+ Hours on Skin',
    sillage: 'Radiant & Magnetic',
    macerationDays: 120,
    origin: 'Grasse & Paris, France',
    accords: ['Sandalwood', 'Orris Butter', 'Cardamom', 'Smoked Cedar', 'Mineral Amber'],
    mood: 'Commanding, Meditative, Aristocratic',
    season: 'Autumn, Winter & Evening Nocturne',
    heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: 'rose-dispahan',
    name: 'Rose d\'Ispahan',
    frenchTitle: 'Eau de Parfum Intense — 26% Concentration',
    concentration: 'Eau de Parfum',
    concentrationPercentage: '26% Eau de Parfum',
    family: 'Floral Sublime',
    tagline: 'Velvety Damask petals steeped in saffron threads and dark Cambodian oud.',
    shortDescription: 'A nocturnal, opulent floral encounter. Hundred-petaled May rose woven with crimson Persian saffron, incense, and deep amber honey.',
    fullStory: 'Conceived in the quiet dawn hours when the roses of Grasse release their most intoxicating nectar. Rose d\'Ispahan pairs the fragile dew of Rosa Centifolia with the nocturnal smolder of precious saffron threads and vintage amber. An enigmatic tapestry that lingers like a velvet cape in the cool night air.',
    perfumer: 'Éléonore Saint-Germain, Parfumeure de la Maison',
    yearCreated: 2023,
    prices: { EUR: 275, USD: 298, GBP: 245 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Persian Saffron', description: 'Crimson threads with rich earthy spice', origin: 'Khorasan' },
        { name: 'Pink Peppercorn', description: 'Rosy sparkling piquancy', origin: 'Reunion Island' },
        { name: 'Mandarin Zest', description: 'Luminous sweet citrus opening', origin: 'Sicily, Italy' }
      ],
      heart: [
        { name: 'Rosa Centifolia Absolute', description: 'Hand-picked May Rose with honeyed depth', origin: 'Domaine MACESA, Grasse' },
        { name: 'Damask Rose Essence', description: 'Crisp morning dew petal clarity', origin: 'Kazanlak Valley, Bulgaria' },
        { name: 'Geranium Bourbon', description: 'Aromatic green herbal rosy backbone', origin: 'Madagascar' }
      ],
      base: [
        { name: 'Aged Oud Assafi', description: 'Deep, resinous and velvety woody darkness', origin: 'Assam, India' },
        { name: 'Frankincense Tears', description: 'Sacred balsamic temple resin', origin: 'Dhofar, Oman' },
        { name: 'Golden Honey Accord', description: 'Warm sunlit amber nectar', origin: 'Provence, France' }
      ]
    },
    longevity: '12+ Hours on Skin',
    sillage: 'Sumptuous & Intoxicating',
    macerationDays: 90,
    origin: 'Grasse & Paris, France',
    accords: ['Damask Rose', 'Saffron', 'Amber Honey', 'Oud Wood', 'Incense'],
    mood: 'Romantic, Mysterious, Sensual',
    season: 'All Seasons & Intimate Evenings',
    heroImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
    isBestseller: true,
    rating: 4.95,
    reviewCount: 94
  },
  {
    id: 'nuit-celeste',
    name: 'Nuit Céleste',
    frenchTitle: 'Extrait de Parfum — 34% Concentration',
    concentration: 'Extrait de Parfum',
    concentrationPercentage: '34% Pure Parfum',
    family: 'Oriental & Spices',
    tagline: 'Star-lit night jasmine intertwined with dark smoked tonka and bourbon vanilla.',
    shortDescription: 'The intoxicating whisper of nocturnal Grasse gardens under a midnight sky. Sensual sambac jasmine, smoked vanilla bean, and charred benzoin.',
    fullStory: 'Night flowers behave differently from daytime blooms; their petals unfurl in shadows to cast hypnotic trails into the starlight. Nuit Céleste captures this elusive midnight alchemy, framing white floral opulence against dark, smoky balsamic resins and a warm, skin-close musky amber.',
    perfumer: 'Laurent Delacroix & Jean-Marc Vidal',
    yearCreated: 2024,
    prices: { EUR: 310, USD: 340, GBP: 280 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Black Pepper Malabar', description: 'Sharp warm woody pepper', origin: 'Kerala, India' },
        { name: 'Star Anise', description: 'Subtle liquorice aromatic sparkle', origin: 'Vietnam' },
        { name: 'Neroli Bigarade', description: 'Fresh crystalline bitter orange blossom', origin: 'Cap d\'Antibes, France' }
      ],
      heart: [
        { name: 'Night-Blooming Jasmine', description: 'Heady nocturnal white floral absolute', origin: 'Grasse, France' },
        { name: 'Sambac Jasmine Grandiflorum', description: 'Lush tropical tea-like sweetness', origin: 'Tamil Nadu, India' },
        { name: 'Heliotrope', description: 'Powdery almond blossom veil', origin: 'Mediterranean Basin' }
      ],
      base: [
        { name: 'Smoked Tonka Bean', description: 'Charred coumarin with toasted almond warmth', origin: 'Caura River, Venezuela' },
        { name: 'Bourbon Vanilla Infusion', description: 'Hand-split cured gourmet pods', origin: 'Madagascar' },
        { name: 'Siam Benzoin Resin', description: 'Warm balsamic caramel resin', origin: 'Laos' }
      ]
    },
    longevity: '16+ Hours on Fabric & Skin',
    sillage: 'Enveloping & Seductive',
    macerationDays: 140,
    origin: 'Grasse & Paris, France',
    accords: ['Night Jasmine', 'Smoked Tonka', 'Dark Vanilla', 'Black Pepper', 'Benzoin'],
    mood: 'Seductive, Nocturnal, Enigmatic',
    season: 'Evening, Autumn & Winter',
    heroImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    isNew: true,
    isPrivateReserve: true,
    rating: 5.0,
    reviewCount: 76
  },
  {
    id: 'vetiver-mineral',
    name: 'Vétiver Minéral',
    frenchTitle: 'Eau de Parfum — 24% Concentration',
    concentration: 'Eau de Parfum',
    concentrationPercentage: '24% Eau de Parfum',
    family: 'Fresh Citrus & Aromatic',
    tagline: 'Crisp Haitian vetiver roots struck with sea salt and sunlit Amalfi lemon.',
    shortDescription: 'A brisk coastal contrast between mineral ocean spray and smoky, earth-bound vetiver roots. Clean, invigorating, and sharply tailored.',
    fullStory: 'Inspired by the dramatic cliffs of the French Riviera where ancient pine forests plunge into the azure Mediterranean. Vétiver Minéral strips away superfluous weight to reveal the pure elemental tension between crystalline marine salts, sun-dried driftwood, and the rich, earthy roots of Haitian vetiver.',
    perfumer: 'Julien Courbet, Parfumeur Botaniste',
    yearCreated: 2021,
    prices: { EUR: 240, USD: 265, GBP: 215 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Fleur de Sel de Guérande', description: 'Crisp oceanic grey sea salt', origin: 'Brittany, France' },
        { name: 'Amalfi Lemon', description: 'Zesty sparkling sunshine peel', origin: 'Amalfi Coast, Italy' },
        { name: 'Pink Grapefruit', description: 'Bitter-sweet mouthwatering freshness', origin: 'Corsica' }
      ],
      heart: [
        { name: 'Sage Sclarea', description: 'Crisp herbal clean aromatic accord', origin: 'Haute-Provence, France' },
        { name: 'Rosemary Coeur', description: 'Resinous pine-needle Mediterranean fresh breeze', origin: 'Spain' },
        { name: 'Driftwood Accord', description: 'Sun-bleached salty white woods', origin: 'Antibes coast' }
      ],
      base: [
        { name: 'Haitian Vetiver Bourbon', description: 'Smoky, nutty root with grassy freshness', origin: 'Les Cayes, Haiti' },
        { name: 'Cetalox Molecule', description: 'Clean warm ambergris aura', origin: 'Swiss fine chemistry' },
        { name: 'White Cedarwood', description: 'Refined architectural timber structure', origin: 'Virginia, USA' }
      ]
    },
    longevity: '10+ Hours on Skin',
    sillage: 'Crisp, Clean & Airy',
    macerationDays: 75,
    origin: 'Grasse & Paris, France',
    accords: ['Haitian Vetiver', 'Sea Salt', 'Amalfi Lemon', 'Driftwood', 'Clary Sage'],
    mood: 'Exhilarating, Sharp, Modern, Confident',
    season: 'Spring, Summer & Daylight',
    heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=85',
    rating: 4.85,
    reviewCount: 112
  },
  {
    id: 'cuir-nomade',
    name: 'Cuir Nomade',
    frenchTitle: 'Extrait de Parfum — 30% Concentration',
    concentration: 'Extrait de Parfum',
    concentrationPercentage: '30% Pure Parfum',
    family: 'Woody & Amber',
    tagline: 'Hand-buffed Tuscan leather accented with wild raspberry and frankincense smoke.',
    shortDescription: 'A rich, supple leather composition that balances rugged raw hides with the unexpected tart sweetness of wild mountain berries and sacred resins.',
    fullStory: 'Traveling from the historic leather tanneries of Santa Croce to the desert caravans of the Levant. Cuir Nomade evokes worn saddlebags, antique libraries, and the smoke of cedar embers under a tent of stars. Unapologetically bold yet seamlessly smooth.',
    perfumer: 'Éléonore Saint-Germain',
    yearCreated: 2023,
    prices: { EUR: 320, USD: 350, GBP: 290 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Wild Highland Raspberry', description: 'Tart, jammy scarlet fruit opening', origin: 'Auvergne, France' },
        { name: 'Thyme Absolute', description: 'Aromatic dry herbal spice', origin: 'Provence, France' },
        { name: 'Saffron Pistils', description: 'Earthy golden warmth', origin: 'Iran' }
      ],
      heart: [
        { name: 'Tuscan Suede Accord', description: 'Soft glove-leather with buttery velvet texture', origin: 'Florence, Italy' },
        { name: 'Night Jasmine Sambac', description: 'Luminous contrast to dark hide', origin: 'Grasse, France' },
        { name: 'Birch Tar Essence', description: 'Smoky, charred birch wood distillation', origin: 'Finland' }
      ],
      base: [
        { name: 'Black Amber Resin', description: 'Dense, honeyed and ancient fossilized warmth', origin: 'Baltic region' },
        { name: 'Smoked Olibanum', description: 'Spiritual incense ribbons', origin: 'Somaliland' },
        { name: 'Patchouli Coeur', description: 'Earthy, stripped-down damp woody foundation', origin: 'Sumatra, Indonesia' }
      ]
    },
    longevity: '15+ Hours on Skin',
    sillage: 'Pronounced & Unforgettable',
    macerationDays: 130,
    origin: 'Grasse & Paris, France',
    accords: ['Tuscan Leather', 'Wild Raspberry', 'Birch Smoke', 'Saffron', 'Amber'],
    mood: 'Bold, Rebellious, Aristocratic',
    season: 'Autumn, Winter & Chilly Evenings',
    heroImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    isPrivateReserve: true,
    rating: 4.92,
    reviewCount: 68
  },
  {
    id: 'fleur-doranger-intense',
    name: 'Fleur d\'Oranger Intense',
    frenchTitle: 'Eau de Parfum — 25% Concentration',
    concentration: 'Eau de Parfum',
    concentrationPercentage: '25% Eau de Parfum',
    family: 'Floral Sublime',
    tagline: 'Sun-warmed orange blossoms drenched in neroli nectar and white cashmere musk.',
    shortDescription: 'The intoxicating aura of springtime in the Mediterranean orange groves. Delicate white blossoms, bitter petitgrain, and a comforting trail of solar musk.',
    fullStory: 'Harvested in the early morning before the Mediterranean sun evaporates the delicate volatile oils. Fleur d\'Oranger captures the full lifecycle of the orange tree: from the crisp green wood of the twigs, through the honeyed blossoms, to the sweet, sun-kissed fruits.',
    perfumer: 'Laurent Delacroix',
    yearCreated: 2022,
    prices: { EUR: 250, USD: 275, GBP: 225 },
    sizes: [
      { ml: 50, label: '50ml / 1.7 fl.oz', priceMultiplier: 0.72 },
      { ml: 100, label: '100ml / 3.4 fl.oz — Signature Flacon', priceMultiplier: 1.0 },
      { ml: 250, label: '250ml / 8.5 fl.oz — Flacon d\'Exception', priceMultiplier: 1.95 }
    ],
    notes: {
      top: [
        { name: 'Neroli Tunisien', description: 'Sparkling floral citrus with honeyed gleam', origin: 'Nabeul, Tunisia' },
        { name: 'Petitgrain Bigaradier', description: 'Crushed green citrus leaf and twig notes', origin: 'Grasse, France' },
        { name: 'Clementine Peel', description: 'Juicy sweet Mediterranean citrus', origin: 'Corsica' }
      ],
      heart: [
        { name: 'Orange Blossom Absolute', description: 'Indolic, velvety, sun-drenched floral heart', origin: 'Morocco' },
        { name: 'Egyptian Jasmine', description: 'Dewy petal sweetness and radiant softness', origin: 'Nile Delta' },
        { name: 'Tuberose Enfleurage', description: 'Creamy opulent white flower dimension', origin: 'Grasse, France' }
      ],
      base: [
        { name: 'White Cashmere Musk', description: 'Clean, pillow-soft, sensual skin warmth', origin: 'Fine synthetic musk accord' },
        { name: 'Blonde Cedar', description: 'Gentle honeyed architectural wood', origin: 'Atlas Mountains' },
        { name: 'Vanilla Bourbon Orchid', description: 'Soft subtle whisper of sweet pod', origin: 'Madagascar' }
      ]
    },
    longevity: '11+ Hours on Skin',
    sillage: 'Luminous & Joyous',
    macerationDays: 90,
    origin: 'Grasse & Paris, France',
    accords: ['Orange Blossom', 'Neroli', 'White Musk', 'Petitgrain', 'Solar Woods'],
    mood: 'Joyous, Solar, Elegant, Radiant',
    season: 'Spring, Summer & Bright Days',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85',
    rating: 4.88,
    reviewCount: 89
  },
  {
    id: 'coffret-decouverte',
    name: 'Le Coffret Découverte',
    frenchTitle: 'Wardrobe Miniature Collection — 5 × 10ml Sprays',
    concentration: 'Coffret d\'Exception',
    concentrationPercentage: 'Pure Extracts & Eaux de Parfum',
    family: 'Discovery Wardrobe',
    tagline: 'The complete MACESA olfactory collection, housed in a velvet-lined coffret.',
    shortDescription: 'Explore the full spectrum of our house. Includes 5 deluxe 10ml flacons with an included €60 voucher toward your first full-size flacon.',
    fullStory: 'Curated for the discerning fragrance connoisseur. Contains travel flacons of Santal Impérial, Rose d\'Ispahan, Nuit Céleste, Vétiver Minéral, and Cuir Nomade. Each miniature is fitted with our signature micro-mist atomiser, enclosed in an embossed black and gold box tied with grosgrain ribbon.',
    perfumer: 'Les Maîtres Parfumeurs de MACESA',
    yearCreated: 2024,
    prices: { EUR: 145, USD: 160, GBP: 130 },
    sizes: [
      { ml: 50, label: '5 × 10ml Deluxe Atomisers (50ml total)', priceMultiplier: 1.0 }
    ],
    notes: {
      top: [
        { name: 'Santal Impérial (10ml)', description: 'Woody, Iris Butter & Sandalwood' },
        { name: 'Rose d\'Ispahan (10ml)', description: 'Damask Rose, Saffron & Aged Oud' },
        { name: 'Nuit Céleste (10ml)', description: 'Night Jasmine, Tonka & Smoked Vanilla' }
      ],
      heart: [
        { name: 'Vétiver Minéral (10ml)', description: 'Haitian Vetiver, Guérande Salt & Amalfi Lemon' },
        { name: 'Cuir Nomade (10ml)', description: 'Tuscan Leather, Wild Berries & Incense' }
      ],
      base: [
        { name: '€60 Privilege Voucher', description: 'Redeemable on any 100ml flacon within 12 months' }
      ]
    },
    longevity: 'Varies by Fragrance (10-16h)',
    sillage: 'Comprehensive Wardrobe',
    macerationDays: 120,
    origin: 'Grasse & Paris, France',
    accords: ['Discovery Wardrobe', 'All Olfactory Families', 'Full Spectrum Experience'],
    mood: 'Curious, Discerning, Giftable',
    season: 'Year-Round Discovery',
    heroImage: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=85',
    lifestyleImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    isBestseller: true,
    rating: 4.98,
    reviewCount: 240
  }
];

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    city: 'Paris',
    country: 'France',
    name: 'Maison Flagship Saint-Honoré',
    address: '18 Rue du Faubourg Saint-Honoré, 75008 Paris',
    hours: 'Monday – Saturday: 10:00 – 19:30',
    phone: '+33 1 42 68 55 00',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    isFlagship: true
  },
  {
    city: 'London',
    country: 'United Kingdom',
    name: 'Mayfair Townhouse Boutique',
    address: '42 Mount Street, Mayfair, London W1K 2RY',
    hours: 'Monday – Saturday: 10:00 – 19:00',
    phone: '+44 20 7499 8820',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    city: 'New York',
    country: 'United States',
    name: 'Madison Avenue Atelier',
    address: '780 Madison Avenue, New York, NY 10065',
    hours: 'Monday – Sunday: 11:00 – 19:00',
    phone: '+1 212 555 0192',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    name: 'Ginza Salon de Parfum',
    address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061',
    hours: 'Daily: 11:00 – 20:00',
    phone: '+81 3 3572 4410',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
  },
  {
    city: 'Milan',
    country: 'Italy',
    name: 'Via Montenapoleone Spazio',
    address: 'Via Montenapoleone 14, 20121 Milano',
    hours: 'Monday – Saturday: 10:30 – 19:30',
    phone: '+39 02 7600 3218',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    name: 'Fashion Avenue Flagship',
    address: 'Fashion Avenue, Level G, The Dubai Mall, Downtown Dubai',
    hours: 'Daily: 10:00 – 23:00',
    phone: '+971 4 362 7500',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMPLIMENTARY_SAMPLES = [
  { id: 'sample-santal', name: 'Santal Impérial — 2ml Eau de Parfum Miniature', notes: 'Sandalwood • Orris • Cardamom' },
  { id: 'sample-rose', name: 'Rose d\'Ispahan — 2ml Eau de Parfum Miniature', notes: 'Damask Rose • Saffron • Oud' },
  { id: 'sample-nuit', name: 'Nuit Céleste — 2ml Extrait Miniature', notes: 'Night Jasmine • Tonka • Bourbon Vanilla' },
  { id: 'sample-vetiver', name: 'Vétiver Minéral — 2ml Eau de Parfum Miniature', notes: 'Haitian Vetiver • Fleur de Sel • Lemon' },
  { id: 'sample-cuir', name: 'Cuir Nomade — 2ml Extrait Miniature', notes: 'Tuscan Leather • Raspberry • Smoked Amber' },
  { id: 'sample-oranger', name: 'Fleur d\'Oranger — 2ml Eau de Parfum Miniature', notes: 'Orange Blossom • Neroli • Solar Musk' },
];
