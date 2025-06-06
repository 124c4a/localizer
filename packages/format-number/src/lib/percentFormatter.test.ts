import { percentFormatter } from './percentFormatter.js';

describe('percentFormatter', () => {
  it('formats a number as a percentage for a given locale', () => {
    const formatter = percentFormatter();
    const result = formatter(0.1234).localize('en-US');
    expect(result).toBe('12%');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = percentFormatter();
    const result = formatter(0.1234).localize(null);
    expect(result).toBe('[percent]');
  });

  it('applies custom number format options if provided', () => {
    const formatter = percentFormatter({ minimumFractionDigits: 2 });
    const result = formatter(0.1234).localize('en-US');
    expect(result).toBe('12.34%');
  });

  it('handles bigint values correctly', () => {
    const formatter = percentFormatter();
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('1,234,567,890,123,456,789,000%');
  });
});
