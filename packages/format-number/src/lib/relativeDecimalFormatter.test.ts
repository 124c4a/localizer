import { relativeDecimalFormatter } from './relativeDecimalFormatter.js';

describe('relativeDecimalFormatter', () => {
  it('formats the difference between two numbers correctly for a given locale', () => {
    const formatter = relativeDecimalFormatter();
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+50');
  });

  it('returns a negative value when the reference is greater than the value', () => {
    const formatter = relativeDecimalFormatter();
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('-50');
  });

  it('returns zero when the value equals the reference', () => {
    const formatter = relativeDecimalFormatter();
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('0');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativeDecimalFormatter({ minimumFractionDigits: 2 });
    const result = formatter(150.1, 100).localize('en-US');
    expect(result).toBe('+50.10');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativeDecimalFormatter();
    const result = formatter(
      12345678901234567890n,
      12345678901234567880n
    ).localize('en-US');
    expect(result).toBe('+10');
  });
});
