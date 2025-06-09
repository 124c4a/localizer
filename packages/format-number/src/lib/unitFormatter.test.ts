import { unitFormatter } from './unitFormatter.js';

describe('unitFormatter', () => {
  it('formats a number with a unit correctly for a given locale', () => {
    const formatter = unitFormatter();
    const result = formatter(100, 'kilometer').localize('en-US');
    expect(result).toBe('100 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = unitFormatter();
    const result = formatter(100, 'kilometer').localize(null);
    expect(result).toBe('[unit]');
  });

  it('applies custom number format options if provided', () => {
    const formatter = unitFormatter({ minimumFractionDigits: 2 });
    const result = formatter(100.1, 'kilometer').localize('en-US');
    expect(result).toBe('100.10 km');
  });

  it('handles bigint values correctly', () => {
    const formatter = unitFormatter();
    const result = formatter(12345678901234567890n, 'kilometer').localize(
      'en-US'
    );
    expect(result).toBe('12,345,678,901,234,567,890 km');
  });
});
