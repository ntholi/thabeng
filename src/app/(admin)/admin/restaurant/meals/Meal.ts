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
  category: MealCategory;
  description: string;
  price: number;
}
