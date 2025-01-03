import { MenuItem } from '../menu/MenuItem';

export const BeverageCategories = [
  'Cider',
  'White Wine',
  'Red Wine',
  'Rose Wine',
  'Sparkling Wine',
  'Non-Alcoholic Wine',
  'Champagne',
  'Vermouth',
  'Tequila',
  'Vodka',
  'Whiskey',
  'Rum',
  'Gin',
  'Liqueur',
  'Cognac',
  'Brandy',
  'Juice',
  'Soda',
  'Energy Drink',
  'Water',
  'Beer',
  'Cocktail',
  'Mocktail',
  'Other',
];
type BeverageCategory = (typeof BeverageCategories)[number];

export interface Beverage extends MenuItem {
  category: BeverageCategory;
  price: number;
  size: string;
}
