import { categories } from './data/categories';
import { posts } from './data/posts';

// Mock the resolvers logic
const resolvers = {
  Query: {
    categories: (_parent: unknown, args: { offset?: number; limit?: number }) => {
      const { offset = 0, limit } = args;
      const result = categories.slice(offset, limit ? offset + limit : undefined);
      return result;
    },
    category: (_parent: unknown, args: { id: string }) => {
      return categories.find(cat => cat.id.toString() === args.id) || null;
    },
    posts: (_parent: unknown, args: { offset?: number; limit?: number }) => {
      const { offset = 0, limit } = args;
      const result = posts.slice(offset, limit ? offset + limit : undefined);
      return result;
    },
    post: (_parent: unknown, args: { id: string }) => {
      return posts.find(post => post.id.toString() === args.id) || null;
    },
  },
  Category: {
    posts: (parent: { id: number }) => {
      return posts.filter(post => post.category_id === parent.id);
    },
  },
};

describe('GraphQL Resolvers', () => {
  describe('Query.categories', () => {
    it('should return all categories when no limit', () => {
      const result = resolvers.Query.categories(null, {});
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
    });

    it('should return limited categories', () => {
      const result = resolvers.Query.categories(null, { limit: 2 });
      expect(result).toHaveLength(2);
    });

    it('should handle offset', () => {
      const result = resolvers.Query.categories(null, { offset: 1, limit: 2 });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(2);
    });
  });

  describe('Query.category', () => {
    it('should return category by id', () => {
      const result = resolvers.Query.category(null, { id: '1' });
      expect(result).toBeTruthy();
      expect(result?.id).toBe(1);
    });

    it('should return null for non-existent id', () => {
      const result = resolvers.Query.category(null, { id: '999' });
      expect(result).toBeNull();
    });
  });

  describe('Query.posts', () => {
    it('should return all posts when no limit', () => {
      const result = resolvers.Query.posts(null, {});
      expect(result).toHaveLength(50);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
    });

    it('should return limited posts', () => {
      const result = resolvers.Query.posts(null, { limit: 10 });
      expect(result).toHaveLength(10);
    });
  });

  describe('Query.post', () => {
    it('should return post by id', () => {
      const result = resolvers.Query.post(null, { id: '1' });
      expect(result).toBeTruthy();
      expect(result?.id).toBe(1);
    });

    it('should return null for non-existent id', () => {
      const result = resolvers.Query.post(null, { id: '999' });
      expect(result).toBeNull();
    });
  });

  describe('Category.posts', () => {
    it('should return posts for category', () => {
      const result = resolvers.Category.posts({ id: 1 });
      expect(Array.isArray(result)).toBe(true);
      result.forEach(post => {
        expect(post.category_id).toBe(1);
      });
    });
  });
});