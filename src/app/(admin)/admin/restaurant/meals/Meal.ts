import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export const MealCategories = [
  'Appetizer',
  'Main Course',
  'Side Dish',
  'Soup',
  'Dessert',
  'Other',
] as const;
export type MealCategory = (typeof MealCategories)[number];

export interface Meal extends Resource {
  name: string;
  category: MealCategory;
  description: string;
  price: number;
}
