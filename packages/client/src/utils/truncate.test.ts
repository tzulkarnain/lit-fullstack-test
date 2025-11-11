import { truncate } from './truncate';

describe('truncate', () => {
  it('should return original string if shorter than limit', () => {
    const result = truncate('short text', 20);
    expect(result).toBe('short text');
  });

  it('should truncate string and add ellipsis if longer than limit', () => {
    const result = truncate('this is a very long text that should be truncated', 20);
    expect(result).toBe('this is a very long ...');
  });

  it('should handle empty string', () => {
    const result = truncate('', 10);
    expect(result).toBe('');
  });

  it('should use default limit of 120', () => {
    const longText = 'a'.repeat(150);
    const result = truncate(longText);
    expect(result).toBe('a'.repeat(120) + '...');
  });
});