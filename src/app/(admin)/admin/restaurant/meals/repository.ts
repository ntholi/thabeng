import { collection, orderBy, query, where } from 'firebase/firestore';
import { Meal } from './Meal';
import { db } from '@/lib/config/firebase';
import { FirebaseRepository } from '@/app/(admin)/admin-core';

class MealRepository extends FirebaseRepository<Meal> {
  constructor() {
    super('meals');
  }
}

export const mealRepository = new MealRepository();
