import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { MenuItem, MenuItemType } from './MenuItem';
import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/config/firebase';

export class MenuItemRepository<
  T extends MenuItem,
> extends FirebaseRepository<T> {
  constructor(protected readonly type?: MenuItemType) {
    super('menuItems');
  }

  create(resource: ResourceCreate<T>): Promise<T> {
    if (this.type) {
      resource.type = this.type;
    }
    return super.create(resource);
  }

  listen(
    callback: (resources: T[]) => void,
    filter?: { field: string; value: any } | undefined,
  ): () => void {
    filter = {
      field: 'type',
      value: this.type,
    };
    const ref = collection(db, this.collectionName);
    const q = filter
      ? query(
          ref,
          where(filter.field, '==', filter.value),
          orderBy('name', 'asc'),
        )
      : query(ref, orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resources: T[] = [];
      snapshot.forEach((doc) => {
        resources.push({ ...doc.data(), id: doc.id } as T);
      });
      callback(resources);
    });
    return unsubscribe;
  }
}

export const menuItemRepository = new MenuItemRepository();
