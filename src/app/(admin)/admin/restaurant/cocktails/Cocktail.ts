import { MenuItem } from '../menu/MenuItem';

export interface Cocktail extends MenuItem {
  description: string;
  price: number;
}
