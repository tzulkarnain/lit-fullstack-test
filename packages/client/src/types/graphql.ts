export type Category = {
  id: string;
  title: string;
  description: string;
  posts?: Post[];
};

export type Post = {
  id: string;
  title: string;
  category_id: string;
  content: string;
  cover: string;
};

export type QueryItemsArgs = {
  offset?: number;
  limit?: number;
};

export type QueryItemArgs = {
  id: string;
};
