import { MenuItem } from '../menu/MenuItem';

export interface Wine extends MenuItem {
  description: string;
  price: number;
  year: number;
}
