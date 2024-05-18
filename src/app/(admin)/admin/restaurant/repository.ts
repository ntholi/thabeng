import { collection, orderBy, query, where } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { MenuItem } from './MenuItem';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class MenuItemRepository extends FirebaseRepository<MenuItem> {
  constructor() {
    super('menuitems');
  }
}

export const menuitemRepository = new MenuItemRepository();
