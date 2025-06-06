import { localizeArray } from './localizeArray.js';

describe('localizeArray', () => {
  it('returns localized values for an array of localizable objects', () => {
    const values = [
      { localize: (locale: string) => `value1 for ${locale}` },
      { localize: (locale: string) => `value2 for ${locale}` },
    ];
    expect(localizeArray(values, 'en-US')).toEqual([
      'value1 for en-US',
      'value2 for en-US',
    ]);
  });

  it('returns original values for non-localizable objects', () => {
    const values = [42, 'string', true];
    expect(localizeArray(values, 'en-US')).toEqual([42, 'string', true]);
  });

  it('handles mixed arrays of localizable and non-localizable objects', () => {
    const values = [
      { localize: (locale: string) => `value1 for ${locale}` },
      42,
      'string',
    ];
    expect(localizeArray(values, 'en-US')).toEqual([
      'value1 for en-US',
      42,
      'string',
    ]);
  });

  it('returns an empty array when input is an empty array', () => {
    expect(localizeArray([], 'en-US')).toEqual([]);
  });

  it('handles null values in the array gracefully', () => {
    const values = [
      null,
      { localize: (locale: string) => `value for ${locale}` },
    ];
    expect(localizeArray(values, 'en-US')).toEqual([null, 'value for en-US']);
  });

  it('handles undefined values in the array gracefully', () => {
    const values = [
      undefined,
      { localize: (locale: string) => `value for ${locale}` },
    ];
    expect(localizeArray(values, 'en-US')).toEqual([
      undefined,
      'value for en-US',
    ]);
  });
});
