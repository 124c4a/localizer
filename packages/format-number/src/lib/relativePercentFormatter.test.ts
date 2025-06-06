import { relativePercentFormatter } from './relativePercentFormatter.js';

describe('relativePercentFormatter', () => {
  it('formats the relative percentage difference between two numbers correctly for a given locale', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+50%');
  });

  it('returns negative percentage when the value is less than the reference', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(50, 100).localize('en-US');
    expect(result).toBe('-50%');
  });

  it('returns zero percentage when the value equals the reference', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('0%');
  });

  it('returns positive infinity percentage when the reference is zero and value is positive', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(100, 0).localize('en-US');
    expect(result).toBe('+∞%');
  });

  it('returns negative infinity percentage when the reference is zero and value is negative', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(-100, 0).localize('en-US');
    expect(result).toBe('-∞%');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativePercentFormatter({ minimumFractionDigits: 2 });
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+50.00%');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(
      12345678901234567890n,
      12345678901234567880n
    ).localize('en-US');
    expect(result).toBe('0%');
  });
});
