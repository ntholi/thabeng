import { Resource } from '../../admin-core/repository/repository';

export interface Room extends Resource {
  name: string;
  description: string;
  image?: string;
  amenities: Amenities[];
}

export interface Amenities {
  name: string;
  count: number;
}
