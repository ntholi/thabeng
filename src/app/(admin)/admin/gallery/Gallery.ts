import { Timestamp } from 'firebase/firestore';
import { Resource } from '../../admin-core/repository/repository';

export interface Gallery extends Resource {
  caption: string;
  image: string;
}
