import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export const MealTimeNames = [
  'Breakfast',
  'Brunch',
  'Lunch',
  'Dinner',
  'Snack',
] as const;
type MealTimeName = (typeof MealTimeNames)[number];

export interface MealTime extends Resource {
  name: MealTimeName;
  startTime: string;
  endTime: string;
  price: number;
  description: string;
}
