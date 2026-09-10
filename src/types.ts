export type OlfactoryFamily = 
  | 'All'
  | 'Woody & Amber'
  | 'Floral Sublime'
  | 'Oriental & Spices'
  | 'Fresh Citrus & Aromatic'
  | 'Discovery Wardrobe';

export type Currency = 'EUR' | 'USD' | 'GBP';

export interface FragranceNote {
  name: string;
  description: string;
  origin?: string;
}

export interface Fragrance {
  id: string;
  name: string;
  frenchTitle: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Coffret d\'Exception';
  concentrationPercentage: string;
  family: 'Woody & Amber' | 'Floral Sublime' | 'Oriental & Spices' | 'Fresh Citrus & Aromatic' | 'Discovery Wardrobe';
  tagline: string;
  shortDescription: string;
  fullStory: string;
  perfumer: string;
  yearCreated: number;
  prices: {
    EUR: number;
    USD: number;
    GBP: number;
  };
  sizes: {
    ml: number;
    label: string;
    priceMultiplier: number;
  }[];
  notes: {
    top: FragranceNote[];
    heart: FragranceNote[];
    base: FragranceNote[];
  };
  longevity: string; // e.g. "14+ hours"
  sillage: string; // e.g. "Heavy & Radiant"
  macerationDays: number;
  origin: string;
  accords: string[];
  mood: string;
  season: string;
  heroImage: string;
  lifestyleImage: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isPrivateReserve?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique cart entry ID (item + size + engraving)
  fragrance: Fragrance;
  sizeMl: number;
  price: number;
  quantity: number;
  engravingText?: string;
}

export interface BoutiqueLocation {
  city: string;
  country: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  isFlagship?: boolean;
}

export type ActiveTab = 'home' | 'catalog' | 'the-house' | 'pyramid' | 'quiz' | 'boutiques';
