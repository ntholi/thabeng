import { db } from '@/lib/config/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { Post } from '../posts/Post';
import { postRepository } from '../posts/repository';

class HomePageRepository {
  listenArticles(callback: (articles: Array<Post | null>) => void) {
    const docRef = doc(db, 'pages', 'home-page');
    return onSnapshot(docRef, async (d) => {
      const data = d.data() as HomePage;
      const articles = new Array<Post | null>();
      for (const id of data.articleIds) {
        if (id) {
          const articleDoc = await getDoc(doc(db, 'posts', id));
          articles.push({ id: articleDoc.id, ...articleDoc.data() } as Post);
        } else articles.push(null);
      }
      callback(articles);
    });
  }
  async articles(): Promise<Array<Post | null>> {
    const res = (
      await getDoc(doc(db, 'pages', 'home-page'))
    ).data() as HomePage;

    const data = new Array<Post | null>();
    for (const id of res.articleIds) {
      if (id) {
        const articleDoc = await getDoc(doc(db, 'posts', id));
        data.push({ id: articleDoc.id, ...articleDoc.data() } as Post);
      } else data.push(null);
    }
    return data;
  }

  async setArticle(index: number, articleId: string) {
    const docRef = doc(db, 'pages', 'home-page');
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as HomePage;
    data.articleIds[index] = articleId;
    await setDoc(docRef, data);
  }

  async deleteArticle(index: number) {
    const docRef = doc(db, 'pages', 'home-page');
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as HomePage;
    data.articleIds[index] = null;
    await setDoc(docRef, data);
  }

  async autoArrange() {
    const articleIds = (await postRepository.getAll(20)).map((it) => it.id);
    const docRef = doc(db, 'pages', 'home-page');
    await setDoc(docRef, { articleIds });
  }
}

export const homePageRepository = new HomePageRepository();
