import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Gin } from './Gin';
import { MenuItemRepository } from '../menu/menuItemRepository';

class GinRepository extends MenuItemRepository<Gin> {
  constructor() {
    super('Gin & Tonic');
  }
}

export const ginRepository = new GinRepository();
