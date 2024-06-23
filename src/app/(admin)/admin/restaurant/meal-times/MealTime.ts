import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import { MenuItem } from '../menu/MenuItem';

export const MealTimeNames = [
  'Breakfast',
  'Brunch',
  'Lunch',
  'Dinner',
  'Snack',
] as const;
type MealTimeName = (typeof MealTimeNames)[number];

export interface MealTime extends MenuItem {
  name: MealTimeName;
  startTime: string;
  endTime: string;
  price: number;
  description: string;
}
