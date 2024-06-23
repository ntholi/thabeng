import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export interface Gin extends Resource {
  name: string;
  description: string;
  price: number;
}
