import { db } from '@/lib/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

class HomePageRepository {
  async setHomePage(homePage: HomePage) {
    await setDoc(doc(db, 'homePage', 'default'), homePage);
  }

  async getHomePage() {
    const docRef = doc(db, 'homePage', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HomePage;
    } else {
      return null;
    }
  }
}

export const homePageRepository = new HomePageRepository();
