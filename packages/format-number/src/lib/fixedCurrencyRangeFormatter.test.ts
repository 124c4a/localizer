import { fixedCurrencyRangeFormatter } from './fixedCurrencyRangeFormatter.js';

describe('fixedCurrencyRangeFormatter', () => {
  it('formats a range of numbers as currency for a given locale', () => {
    const formatter = fixedCurrencyRangeFormatter('USD');
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('$1,000.00 – $2,000.00');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedCurrencyRangeFormatter('USD');
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[currencyRange]');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedCurrencyRangeFormatter('EUR');
    const result = formatter(
      12345678901234567890n,
      22345678901234567890n
    ).localize('en-US');
    expect(result).toBe(
      '€12,345,678,901,234,567,890.00 – €22,345,678,901,234,567,890.00'
    );
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedCurrencyRangeFormatter('USD', {
      minimumFractionDigits: 4,
    });
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('$1,000.0000 – $2,000.0000');
  });
});
