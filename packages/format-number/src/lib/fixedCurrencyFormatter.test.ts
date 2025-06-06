import { fixedCurrencyFormatter } from './fixedCurrencyFormatter.js';

describe('fixedCurrencyFormatter', () => {
  it('formats a number as currency for a given locale', () => {
    const formatter = fixedCurrencyFormatter('USD');
    const result = formatter(1234.56).localize('en-US');
    expect(result).toBe('$1,234.56');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedCurrencyFormatter('USD');
    const result = formatter(1234.56).localize(null);
    expect(result).toBe('[currency]');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedCurrencyFormatter('EUR');
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('€12,345,678,901,234,567,890.00');
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedCurrencyFormatter('USD', {
      minimumFractionDigits: 3,
    });
    const result = formatter(1234).localize('en-US');
    expect(result).toBe('$1,234.000');
  });
});
