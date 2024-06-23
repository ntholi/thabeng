import { Resource } from '@/app/(admin)/admin-core/repository/repository';

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

export interface Beverage extends Resource {
  name: string;
  category: BeverageCategory;
  price: number;
  size: string;
}
