import { db } from '@/lib/config/firebase';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { MealTime } from './MealTime';

class MealTimeRepository extends FirebaseRepository<MealTime> {
  constructor() {
    super('mealtimes');
  }
}

export const mealtimeRepository = new MealTimeRepository();
