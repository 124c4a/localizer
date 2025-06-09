import { currencyFormatter } from './currencyFormatter.js';

describe('currencyFormatter', () => {
  it('formats a number as currency for a given locale', () => {
    const formatter = currencyFormatter();
    const result = formatter(1234.56, 'USD').localize('en-US');
    expect(result).toBe('$1,234.56');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = currencyFormatter();
    const result = formatter(1234.56, 'USD').localize(null);
    expect(result).toBe('[currency]');
  });

  it('handles bigint values correctly', () => {
    const formatter = currencyFormatter();
    const result = formatter(12345678901234567890n, 'EUR').localize('en-US');
    expect(result).toBe('€12,345,678,901,234,567,890.00');
  });
});
