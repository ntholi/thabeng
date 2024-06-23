import { MenuItemRepository } from '../menu/menuItemRepository';
import { Meal } from './Meal';

class MealRepository extends MenuItemRepository<Meal> {
  constructor() {
    super('Meals');
  }
}

export const mealRepository = new MealRepository();
