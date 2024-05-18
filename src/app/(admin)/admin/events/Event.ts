import { Resource } from '../../admin-core/repository/repository';

export interface Event extends Resource {
  name: string;
  date: Date;
  description: string;
}
