/**
 * Truncates a string to a specified length and appends an ellipsis if it exceeds that length.
 * @param {string} str - The string to truncate.
 * @param {number} [limit=120] - The maximum length of the string before truncation.
 * @returns {string} The truncated string, or the original string if it is shorter than the limit.
 * @example
 * // Returns 'This is a very...'
 * truncate('This is a very long string that will be truncated', 14);
 */
export const truncate = (str: string, limit: number = 120) => {
  if (!str || str.length < limit) {
    return str || '';
  }

  return `${str.slice(0, limit)}...`;
};
