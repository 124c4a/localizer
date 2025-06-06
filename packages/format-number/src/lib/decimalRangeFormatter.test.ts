import { decimalRangeFormatter } from './decimalRangeFormatter.js';

describe('decimalRangeFormatter', () => {
  it('formats a range of numbers correctly for a given locale', () => {
    const formatter = decimalRangeFormatter();
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1,000–2,000');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = decimalRangeFormatter();
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[decimalRange]');
  });

  it('handles bigint values correctly', () => {
    const formatter = decimalRangeFormatter();
    const result = formatter(
      12345678901234567890n,
      22345678901234567890n
    ).localize('en-US');
    expect(result).toBe(
      '12,345,678,901,234,567,890–22,345,678,901,234,567,890'
    );
  });

  it('applies custom number format options if provided', () => {
    const formatter = decimalRangeFormatter({ minimumFractionDigits: 2 });
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1,000.00–2,000.00');
  });
});
