import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Booking } from './Booking';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class BookingRepository extends FirebaseRepository<Booking> {
  constructor() {
    super('bookings');
  }

  create(resource: ResourceCreate<Booking>): Promise<Booking> {
    const data = {
      ...resource,
      seen: false,
    };
    return super.create(data);
  }

  markAsSeen(id: string) {
    updateDoc(this.docRef(id), { seen: true });
  }

  unseenBookings(callback: (count: number) => void) {
    const q = query(
      collection(db, this.collectionName),
      where('seen', '==', false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.length);
    });
    return unsubscribe;
  }
}

export const bookingRepository = new BookingRepository();
