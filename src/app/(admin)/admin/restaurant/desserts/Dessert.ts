import { MenuItem } from '../menu/MenuItem';

export interface Dessert extends MenuItem {
  name: string;
  description: string;
  price: number;
}
