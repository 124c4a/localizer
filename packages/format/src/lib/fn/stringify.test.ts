import { stringify } from './stringify.js';

describe('stringify', () => {
  it('returns a Localizable object that converts a value to a string for a valid locale', () => {
    const result = stringify(123).localize('en-US');
    expect(result).toBe('123');
  });

  it('returns a placeholder string for undefined locale', () => {
    const result = stringify(123).localize(null);
    expect(result).toBe('[stringify]');
  });

  it('handles null values correctly', () => {
    const result = stringify(null).localize('en-US');
    expect(result).toBe('null');
  });

  it('handles undefined values correctly', () => {
    const result = stringify(undefined).localize('en-US');
    expect(result).toBe('undefined');
  });

  it('handles object values by converting them to string', () => {
    const result = stringify({ key: 'value' }).localize('en-US');
    expect(result).toBe('[object Object]');
  });

  it('handles array values by converting them to string', () => {
    const result = stringify([1, 2, 3]).localize('en-US');
    expect(result).toBe('1,2,3');
  });

  it('handles boolean values correctly', () => {
    const result = stringify(true).localize('en-US');
    expect(result).toBe('true');
  });

  it('handles symbol values correctly', () => {
    const result = stringify(Symbol('test')).localize('en-US');
    expect(result).toBe('Symbol(test)');
  });
});
