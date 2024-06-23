import { MenuItem } from '../menu/MenuItem';

export interface Gin extends MenuItem {
  name: string;
  description: string;
  price: number;
}
