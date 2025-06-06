import { relativeTimeFormatter } from './relativeTimeFormatter.js';

describe('relativeTimeFormatter', () => {
  it('returns a formatter that formats relative time correctly with default options', () => {
    const formatter = relativeTimeFormatter();
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02')
    ).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('returns a formatter that applies custom options correctly', () => {
    const formatter = relativeTimeFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-02'),
      new Date('2023-01-01')
    ).localize('en-US');
    expect(result).toBe('yesterday');
  });

  it('handles undefined options by falling back to default behavior', () => {
    const formatter = relativeTimeFormatter(undefined);
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02')
    ).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('handles edge cases where both dates are the same', () => {
    const formatter = relativeTimeFormatter();
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-01')
    ).localize('en-US');
    expect(result).toBe('this minute');
  });
});
