import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { categories } from "./data/categories.js";
import { posts } from "./data/posts.js";

const typeDefs = `#graphql
  type Category {
    id: ID
    title: String
    description: String
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
    category_id: ID
    content: String
    cover: String
  }

  type Query {
    categories(
      offset: Int = 0
      limit: Int
    ): [Category]
    category(id: ID!): Category
    posts(
      offset: Int = 0
      limit: Int
    ): [Post]
    post(id: ID!): Post
  }
`;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Server ready at: ${url}`);
