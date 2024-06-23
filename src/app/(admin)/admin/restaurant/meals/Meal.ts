import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import { MenuItem } from '../menu/MenuItem';

export const MealCategories = [
  'Appetizer',
  'Main Course',
  'Side Dish',
  'Soup',
  'Dessert',
  'Other',
] as const;
export type MealCategory = (typeof MealCategories)[number];

export interface Meal extends MenuItem {
  name: string;
  category: MealCategory;
  description: string;
  price: number;
}
