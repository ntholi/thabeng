import { Timestamp } from 'firebase/firestore';
import { Resource } from '../../admin-core/repository/repository';

export interface Event extends Resource {
  name: string;
  date: Timestamp;
  poster: string;
  description: string;
}
