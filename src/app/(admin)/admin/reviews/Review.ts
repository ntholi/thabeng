import { Resource } from '../../admin-core/repository/repository';

export interface Review extends Resource {
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  seen?: boolean;
  public: boolean;
}
