export interface Clothing {
  id: string;
  user_id: string;
  image_url: string;
  category: ClothingCategory;
  color: string;
  style: Style;
  season: Season;
  brand?: string;
  last_worn?: string;
  wear_count: number;
  created_at: string;
}

export type ClothingCategory =
  | 'tshirt'
  | 'shirt'
  | 'blouse'
  | 'sweater'
  | 'hoodie'
  | 'jacket'
  | 'coat'
  | 'blazer'
  | 'dress'
  | 'skirt'
  | 'jeans'
  | 'pants'
  | 'shorts'
  | 'sneakers'
  | 'shoes'
  | 'boots'
  | 'sandals'
  | 'accessory'
  | 'other';

export type Style = 'casual' | 'formal' | 'sport' | 'elegant' | 'bohemian' | 'minimalist' | 'streetwear';

export type Season = 'summer' | 'winter' | 'spring' | 'autumn' | 'all';
