import { collection, orderBy, query, where } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Event } from './Event';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class EventRepository extends FirebaseRepository<Event> {
  constructor() {
    super('events');
  }
}

export const eventRepository = new EventRepository();
