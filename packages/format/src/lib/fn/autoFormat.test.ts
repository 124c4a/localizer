import { autoFormat } from './autoFormat.js';

describe('autoFormat', () => {
  it('formats numbers correctly as decimals', () => {
    const result = autoFormat(123456);
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats bigints correctly as decimals', () => {
    const result = autoFormat(BigInt(123456));
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats Number objects correctly as decimals', () => {
    const result = autoFormat(new Number(123456));
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats Date objects correctly as dates', () => {
    const result = autoFormat(new Date('2023-01-01'));
    expect(result.localize('en-US')).toBe('1/1/2023');
  });

  it('formats arrays correctly as lists', () => {
    const result = autoFormat([1, 2, 3]);
    expect(result.localize('en-US')).toBe('1, 2, 3');
  });

  it('returns the value directly if it is already localizable', () => {
    const localizableValue = { localize: () => 'already localizable' };
    const result = autoFormat(localizableValue);
    expect(result.localize('en-US')).toBe('already localizable');
  });

  it('returns Empty for undefined values', () => {
    const result = autoFormat(undefined);
    expect(result.localize('en-US')).toBe('');
  });

  it('formats other values using stringify', () => {
    const result = autoFormat({ key: 'value' });
    expect(result.localize('en-US')).toBe('[object Object]');
  });
});
