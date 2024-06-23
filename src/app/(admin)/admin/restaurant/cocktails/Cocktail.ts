import { MenuItem } from '../menu/MenuItem';

export interface Cocktail extends MenuItem {
  name: string;
  description: string;
  price: number;
}
