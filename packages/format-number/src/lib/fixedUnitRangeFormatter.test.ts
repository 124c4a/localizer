import { fixedUnitRangeFormatter } from './fixedUnitRangeFormatter.js';

describe('fixedUnitRangeFormatter', () => {
  it('formats a range of numbers with a unit correctly for a given locale', () => {
    const formatter = fixedUnitRangeFormatter('kilometer');
    const result = formatter(100, 200).localize('en-US');
    expect(result).toBe('100–200 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedUnitRangeFormatter('kilometer');
    const result = formatter(100, 200).localize(null);
    expect(result).toBe('[unitRange]');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedUnitRangeFormatter('kilometer');
    const result = formatter(
      12345678901234567890n,
      22345678901234567890n
    ).localize('en-US');
    expect(result).toBe(
      '12,345,678,901,234,567,890–22,345,678,901,234,567,890 km'
    );
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedUnitRangeFormatter('kilometer', {
      minimumFractionDigits: 2,
    });
    const result = formatter(100, 200).localize('en-US');
    expect(result).toBe('100.00–200.00 km');
  });
});
