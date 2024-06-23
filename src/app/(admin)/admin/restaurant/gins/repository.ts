import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Gin } from './Gin';

class GinRepository extends FirebaseRepository<Gin> {
  constructor() {
    super('gins');
  }
}

export const ginRepository = new GinRepository();
