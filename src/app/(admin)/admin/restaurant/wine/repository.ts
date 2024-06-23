import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Wine } from './Wine';

class WineRepository extends FirebaseRepository<Wine> {
  constructor() {
    super('wines');
  }
}

export const wineRepository = new WineRepository();
