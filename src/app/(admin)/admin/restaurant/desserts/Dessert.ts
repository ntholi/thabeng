import { MenuItem } from '../menu/MenuItem';

export interface Dessert extends MenuItem {
  description: string;
  price: number;
}
