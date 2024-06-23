import { db } from '@/lib/config/firebase';
import {
  collection,
  doc,
  getCountFromServer,
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

  async getInterested(id: string) {
    const q = query(collection(db, this.collectionName, id, 'interests'));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
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
