import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export type MenuItemType =
  | 'Meals'
  | 'Desserts'
  | 'Beverages'
  | 'Cocktails'
  | 'Gin & Tonic'
  | 'Wine';

export interface MenuItem extends Resource {
  name: string;
  type: MenuItemType;
}
