import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { MenuItem, MenuItemType } from './MenuItem';
import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';

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
    return super.listen(callback, filter);
  }
}

export const cocktailRepository = new MenuItemRepository();
