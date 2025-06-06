import { UnlocalizableValue } from './UnlocalizableValue.js';

describe('Unlocalizable', () => {
  it('returns the value when localize is called', () => {
    const result = new UnlocalizableValue('test value');
    expect(result.localize('en')).toBe('test value');
  });

  it('handles non-string values correctly', () => {
    const result = new UnlocalizableValue(123);
    expect(result.localize('en')).toBe(123);
  });

  it('uses Symbol.toPrimitive to return the primitive value', () => {
    const result = new UnlocalizableValue('primitive value');
    expect(`${result}`).toBe('primitive value');
  });

  it('creates an instance of Localizable', () => {
    const result = new UnlocalizableValue('value');
    expect(result).toHaveProperty('localize');
    expect(typeof result.localize).toBe('function');
  });

  it('handles null values gracefully', () => {
    const result = new UnlocalizableValue(null);
    expect(result.localize('en')).toBe(null);
  });

  it('handles undefined values gracefully', () => {
    const result = new UnlocalizableValue(undefined);
    expect(result.localize('en')).toBe(undefined);
  });
});
