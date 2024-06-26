import { MenuItemRepository } from '../menu/menuItemRepository';
import { Dessert } from './Dessert';

class DessertRepository extends MenuItemRepository<Dessert> {
  constructor() {
    super('Desserts');
  }
}

export const dessertRepository = new DessertRepository();
