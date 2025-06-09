import { relativeUnitFormatter } from './relativeUnitFormatter.js';

describe('relativeUnitFormatter', () => {
  it('formats the relative difference between two values with a unit for a given locale', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('+50 km');
  });

  it('returns a negative value with a unit when the reference is greater than the value', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('-50 km');
  });

  it('returns zero with a unit when the value equals the reference', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('0 km');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativeUnitFormatter('kilometer', {
      minimumFractionDigits: 2,
    });
    const result = formatter(150.1, 100).localize('en-US');
    expect(result).toBe('+50.10 km');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(
      12345678901234567890n,
      12345678901234567880n
    ).localize('en-US');
    expect(result).toBe('+10 km');
  });
});
