import { db } from '@/lib/config/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

class RestaurantPageRepository {
  async setRestaurantPage(restaurantPage: RestaurantPage) {
    await setDoc(doc(db, 'restaurantPage', 'default'), restaurantPage);
  }

  async getRestaurantPage() {
    const docRef = doc(db, 'restaurantPage', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as RestaurantPage;
    } else {
      return null;
    }
  }
}

export const restaurantPageRepository = new RestaurantPageRepository();
