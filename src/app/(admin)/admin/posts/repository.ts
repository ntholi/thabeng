import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Post } from './Post';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';
import { slugify } from '../../admin-core/utils/utils';

class PostRepository extends FirebaseRepository<Post> {
  constructor() {
    super('posts');
  }

  create(resource: ResourceCreate<Post>): Promise<Post> {
    const slug = slugify(resource.title);
    return super.create({ ...resource, slug, published: false });
  }

  update(id: string, resource: Omit<Post, 'id'>): Promise<Post> {
    const slug = slugify(resource.title);
    return super.update(id, { ...resource, slug });
  }

  async getPublished(): Promise<Post[]> {
    const ref = collection(db, this.collectionName);
    const q = query(
      ref,
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
    );
    return await this.getDocs(q);
  }

  async getByAuthor(authorId: string): Promise<Post[]> {
    const ref = collection(db, this.collectionName);
    const q = query(
      ref,
      where('author.id', '==', authorId),
      orderBy('publishedAt', 'desc'),
    );
    return await this.getDocs(q);
  }

  async getByCategory(categoryId: string): Promise<Post[]> {
    console.log('categoryId', categoryId);
    const ref = collection(db, this.collectionName);
    const q = query(
      ref,
      where('category.id', '==', categoryId),
      orderBy('publishedAt', 'desc'),
    );
    return await this.getDocs(q);
  }

  async updatePublishStatus(id: string, published: boolean) {
    const docRef = this.docRef(id);
    await updateDoc(docRef, {
      published,
      publishedAt: published ? serverTimestamp() : null,
    });
  }
}

export const postRepository = new PostRepository();
