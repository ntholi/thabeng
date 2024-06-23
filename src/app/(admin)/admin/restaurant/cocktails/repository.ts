import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Cocktail } from './Cocktail';

class CocktailRepository extends FirebaseRepository<Cocktail> {
  constructor() {
    super('cocktails');
  }
}

export const cocktailRepository = new CocktailRepository();
