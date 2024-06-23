import { MenuItemRepository } from '../menu/menuItemRepository';
import { Wine } from './Wine';

class WineRepository extends MenuItemRepository<Wine> {
  constructor() {
    super('Wine');
  }
}

export const wineRepository = new WineRepository();
