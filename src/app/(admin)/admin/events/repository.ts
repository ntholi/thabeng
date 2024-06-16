import { db } from '@/lib/config/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Event } from './Event';

class EventRepository extends FirebaseRepository<Event> {
  constructor() {
    super('events');
  }

  async latestEvents() {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    return super.getDocs(q);
  }
}

export const eventRepository = new EventRepository();
