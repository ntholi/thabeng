import { MenuItem } from '../menu/MenuItem';

export interface Wine extends MenuItem {
  name: string;
  description: string;
  price: number;
  year: number;
}
