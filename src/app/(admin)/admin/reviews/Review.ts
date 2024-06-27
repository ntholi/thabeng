import { Resource } from '../../admin-core/repository/repository';

export interface Review extends Resource {
  rating: number;
  comment: string;
  seen?: boolean;
  public?: boolean;
}
