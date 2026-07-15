import { Clothing } from './clothing';

export interface Outfit {
  id: string;
  user_id: string;
  name: string;
  occasion: Occasion;
  items: Clothing[];
  rating?: number;
  is_favorite: boolean;
  created_at: string;
}

export type Occasion =
  | 'work'
  | 'university'
  | 'date'
  | 'wedding'
  | 'sport'
  | 'casual'
  | 'formal'
  | 'travel'
  | 'interview'
  | 'party';
