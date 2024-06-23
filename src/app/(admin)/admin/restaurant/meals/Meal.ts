import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export interface Meal extends Resource {
  name: string;
  description: string;
  price: number;
}
