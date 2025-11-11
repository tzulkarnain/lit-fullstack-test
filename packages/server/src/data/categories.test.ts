import { categories } from './categories';

describe('Categories Data', () => {
  it('should have 5 categories', () => {
    expect(categories).toHaveLength(5);
  });

  it('should have proper structure', () => {
    categories.forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('title');
      expect(category).toHaveProperty('description');
      expect(typeof category.id).toBe('number');
      expect(typeof category.title).toBe('string');
      expect(typeof category.description).toBe('string');
    });
  });

  it('should have unique ids', () => {
    const ids = categories.map(cat => cat.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds).toHaveLength(categories.length);
  });
});