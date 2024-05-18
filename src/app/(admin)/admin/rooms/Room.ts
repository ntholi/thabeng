import { Resource } from '../../admin-core/repository/repository';

export interface Room extends Resource {
  name: string;
  description: string;
  image?: string;
}
