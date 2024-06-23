import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Beverage } from './Beverage';
import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';

class BeverageRepository extends FirebaseRepository<Beverage> {
  constructor() {
    super('beverages');
  }

  create(resource: ResourceCreate<Beverage>): Promise<Beverage> {
    resource.size = formatSize(resource.size);
    return super.create(resource);
  }

  update(id: string, resource: Omit<Beverage, 'id'>): Promise<Beverage> {
    resource.size = formatSize(resource.size);
    return super.update(id, resource);
  }
}

function formatSize(size: string): string {
  if (size.trim().toUpperCase().endsWith('ML')) {
    return size.trim().replaceAll(' ', '').toLocaleUpperCase();
  }
  return size;
}

export const beverageRepository = new BeverageRepository();
