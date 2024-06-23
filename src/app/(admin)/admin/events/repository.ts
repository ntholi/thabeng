import { db } from '@/lib/config/firebase';
import {
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Event } from './Event';

class EventRepository extends FirebaseRepository<Event> {
  constructor() {
    super('events');
  }

  async interested(id: string, ipAddress: string) {
    setDoc(doc(db, this.collectionName, id, 'interests', ipAddress), {
      date: serverTimestamp(),
    });
  }

  async latestEvents() {
    const q = query(
      collection(db, this.collectionName),
      orderBy('date', 'desc'),
      limit(17),
    );
    return super.getDocs(q);
  }
}

export const eventRepository = new EventRepository();
