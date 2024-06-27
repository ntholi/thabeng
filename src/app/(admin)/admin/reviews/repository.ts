import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Review } from './Review';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class ReviewRepository extends FirebaseRepository<Review> {
  constructor() {
    super('reviews');
  }

  create(resource: ResourceCreate<Review>): Promise<Review> {
    const data = {
      ...resource,
      seen: false,
    };
    return super.create(data);
  }

  async markAsSeen(id: string) {
    await updateDoc(this.docRef(id), { seen: true });
  }

  async updatePublishStatus(id: string, isPublic: boolean) {
    await updateDoc(this.docRef(id), { isPublic });
  }

  unseenReviews(callback: (count: number) => void) {
    const q = query(
      collection(db, this.collectionName),
      where('seen', '==', false),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.length);
    });
    return unsubscribe;
  }

  publicReviews() {
    const q = query(
      collection(db, this.collectionName),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
    );
    return this.getDocs(q);
  }
}

export const reviewRepository = new ReviewRepository();
