import {
  collection,
  limit,
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

  async latestPosts() {
    const q = query(
      collection(db, this.collectionName),
      orderBy('createdAt', 'desc'),
      where('published', '==', true),
      limit(17)
    );
    return super.getDocs(q);
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
