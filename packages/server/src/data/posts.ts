import { faker } from "@faker-js/faker";

/**
 * Create a random category ID between min and max
 */
const randomCategoryId = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Mocked posts (DO NOT UPDATE)
 */
const categoryTitles = ['Action', 'Adventure', 'Strategy', 'RPG', 'Sports'];

export const posts = new Array(50).fill({}).map((_e, i) => {
  const id = i + 1;
  const category_id = randomCategoryId(1, 5);
  const categoryTitle = categoryTitles[category_id - 1];

  return {
    id,
    title: `Amazing facts about ${categoryTitle} games`,
    category_id,
    content: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => 
      `Gaming fact: ${faker.lorem.sentence({ min: 8, max: 15 })}`
    ).join('\n\n'),
    cover: `${faker.image.urlLoremFlickr({
      category: "technology",
      width: 600,
      height: 250,
    })}?random=${Math.round(Math.random() * 1000)}`,
  };
});
