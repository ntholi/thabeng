import { db } from '@/lib/config/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { Post } from '../posts/Post';
import { postRepository } from '../posts/repository';

class HomePageRepository {
  async setPost(post: HomePage) {
    await setDoc(doc(db, 'home-page', 'default'), post);
  }

  async getPost() {
    const docRef = doc(db, 'home-page', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HomePage;
    } else {
      return null;
    }
  }
}

export const homePageRepository = new HomePageRepository();
