
import { faker } from '@faker-js/faker';

/**
 * Mocked categories (DO NOT UPDATE)
 */
const categoryData = [
  { title: 'Action', description: 'Discover amazing games in the action genre' },
  { title: 'Adventure', description: 'Discover amazing games in the adventure genre' },
  { title: 'Strategy', description: 'Discover amazing games in the strategy genre' },
  { title: 'RPG', description: 'Discover amazing games in the RPG genre' },
  { title: 'Sports', description: 'Discover amazing games in the sports genre' }
];

export const categories = categoryData.map((cat, i) => ({
  id: i + 1,
  ...cat
}));