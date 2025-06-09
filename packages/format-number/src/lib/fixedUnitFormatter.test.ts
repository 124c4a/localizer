import { fixedUnitFormatter } from './fixedUnitFormatter.js';

describe('fixedUnitFormatter', () => {
  it('formats a number with a unit correctly for a given locale', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(100).localize('en-US');
    expect(result).toBe('100 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(100).localize(null);
    expect(result).toBe('[unit]');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('12,345,678,901,234,567,890 km');
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedUnitFormatter('kilometer', {
      minimumFractionDigits: 2,
    });
    const result = formatter(100).localize('en-US');
    expect(result).toBe('100.00 km');
  });
});
