import { percentRangeFormatter } from './percentRangeFormatter.js';

describe('percentRangeFormatter', () => {
  it('formats a range of percentages correctly for a given locale', () => {
    const formatter = percentRangeFormatter();
    const result = formatter(0.1, 0.2).localize('en-US');
    expect(result).toBe('10% – 20%');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = percentRangeFormatter();
    const result = formatter(0.1, 0.2).localize(null);
    expect(result).toBe('[percentRange]');
  });

  it('applies custom number format options if provided', () => {
    const formatter = percentRangeFormatter({ minimumFractionDigits: 2 });
    const result = formatter(0.1234, 0.5678).localize('en-US');
    expect(result).toBe('12.34% – 56.78%');
  });

  it('handles bigint values correctly', () => {
    const formatter = percentRangeFormatter();
    const result = formatter(
      12345678901234567890n,
      22345678901234567890n
    ).localize('en-US');
    expect(result).toBe(
      '1,234,567,890,123,456,789,000% – 2,234,567,890,123,456,789,000%'
    );
  });
});
