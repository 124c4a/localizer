import { decimalFormatter } from './decimalFormatter.js';

describe('decimalFormatter', () => {
  it('formats a number correctly for a given locale', () => {
    const formatter = decimalFormatter();
    const result = formatter(1234.56).localize('en-US');
    expect(result).toBe('1,234.56');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = decimalFormatter();
    const result = formatter(1234.56).localize(null);
    expect(result).toBe('[decimal]');
  });

  it('handles bigint values correctly', () => {
    const formatter = decimalFormatter();
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('12,345,678,901,234,567,890');
  });

  it('applies custom number format options if provided', () => {
    const formatter = decimalFormatter({ minimumFractionDigits: 2 });
    const result = formatter(1234).localize('en-US');
    expect(result).toBe('1,234.00');
  });
});
