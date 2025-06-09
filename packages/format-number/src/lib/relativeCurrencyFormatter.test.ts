import { relativeCurrencyFormatter } from './relativeCurrencyFormatter.js';

describe('relativeCurrencyFormatter', () => {
  it('formats the difference between two values as currency for a given locale', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+$50.00');
  });

  it('returns a negative currency value when the reference is greater than the value', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('-$50.00');
  });

  it('returns zero currency value when the value equals the reference', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('$0.00');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativeCurrencyFormatter('USD', {
      minimumFractionDigits: 3,
    });
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+$50.000');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(
      12345678901234567890n,
      12345678901234567880n
    ).localize('en-US');
    expect(result).toBe('+$10.00');
  });
});
