import { posts } from './posts';

describe('Posts Data', () => {
  it('should have 50 posts', () => {
    expect(posts).toHaveLength(50);
  });

  it('should have proper structure', () => {
    posts.forEach(post => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('category_id');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('cover');
      expect(typeof post.id).toBe('number');
      expect(typeof post.title).toBe('string');
      expect(typeof post.category_id).toBe('number');
      expect(typeof post.content).toBe('string');
      expect(typeof post.cover).toBe('string');
    });
  });

  it('should have category_id between 1 and 5', () => {
    posts.forEach(post => {
      expect(post.category_id).toBeGreaterThanOrEqual(1);
      expect(post.category_id).toBeLessThanOrEqual(5);
    });
  });

  it('should have unique ids', () => {
    const ids = posts.map(post => post.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds).toHaveLength(posts.length);
  });
});