import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export interface Cocktail extends Resource {
  name: string;
  description: string;
  price: number;
}
