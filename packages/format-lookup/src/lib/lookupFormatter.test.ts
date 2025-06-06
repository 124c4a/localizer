import {
  lookupFormatter,
  UndefinedValue,
  NullValue,
  NoValue,
  DefaultValue,
} from './lookupFormatter.js';
import { L } from '@localizer/core';

describe('lookUpFormatter', () => {
  it('returns the correct formatter for a matching value', () => {
    const formatter = lookupFormatter<number>({
      1: L`One`,
      2: L`Two`,
    });
    const result = formatter(1).localize('en-US');
    expect(result).toBe('One');
  });

  it('returns the formatter for UndefinedValue when value is undefined', () => {
    const formatter = lookupFormatter({
      [UndefinedValue]: L`Undefined`,
    });
    const result = formatter(undefined).localize('en-US');
    expect(result).toBe('Undefined');
  });

  it('returns the formatter for NullValue when value is null', () => {
    const formatter = lookupFormatter({
      [NullValue]: L`Null`,
    });
    const result = formatter(null).localize('en-US');
    expect(result).toBe('Null');
  });

  it('returns the formatter for NoValue when value is undefined or null', () => {
    const formatter = lookupFormatter({
      [NoValue]: L`No Value`,
    });
    const resultUndefined = formatter(undefined).localize('en-US');
    const resultNull = formatter(null).localize('en-US');
    expect(resultUndefined).toBe('No Value');
    expect(resultNull).toBe('No Value');
  });

  it('returns the default formatter when no specific match is found', () => {
    const formatter = lookupFormatter({
      [DefaultValue]: L`Default`,
    });
    const result = formatter(3).localize('en-US');
    expect(result).toBe('Default');
  });

  it('throws an error when no match or default formatter is found', () => {
    const formatter = lookupFormatter<number>({
      1: L`One`,
    });
    expect(() => formatter(2).localize('en-US')).toThrowError(
      'Value 2 is not represented in [1], but no default value is specified'
    );
  });

  it('applies a value formatter function when provided', () => {
    const formatter = lookupFormatter<number>({
      1: (value: number) => L`Value is ${L(() => '' + value)}`,
    });
    const result = formatter(1).localize('en-US');
    expect(result).toBe('Value is 1');
  });
});
