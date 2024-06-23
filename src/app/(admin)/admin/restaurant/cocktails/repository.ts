import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Cocktail } from './Cocktail';
import { MenuItemRepository } from '../menu/menuItemRepository';

class CocktailRepository extends MenuItemRepository<Cocktail> {
  constructor() {
    super('Cocktails');
  }
}

export const cocktailRepository = new CocktailRepository();
