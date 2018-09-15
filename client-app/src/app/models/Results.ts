import { Restaurant } from '../models/Restaurant';
export interface Results {
  total: number;
  limit: number;
  page: number;
  pages: number;
  restaurants: Restaurant[];
}
