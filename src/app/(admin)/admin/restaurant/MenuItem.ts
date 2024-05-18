import { Resource } from '../../admin-core/repository/repository';

export interface MenuItem extends Resource {
  name: string;
  description: string;
  price: number;
  image: string;
}