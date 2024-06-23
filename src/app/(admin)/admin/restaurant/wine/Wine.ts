import { Resource } from '@/app/(admin)/admin-core/repository/repository';

export interface Wine extends Resource {
  name: string;
  description: string;
  price: number;
  year: number;
}
