import { localizeObject } from './localizeObject.js';

describe('localizeObject', () => {
  it('returns localized values for an object with localizable properties', () => {
    const values = {
      key1: { localize: (locale: string) => `value1 for ${locale}` },
      key2: { localize: (locale: string) => `value2 for ${locale}` },
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: 'value1 for en-US',
      key2: 'value2 for en-US',
    });
  });

  it('returns original values for non-localizable properties', () => {
    const values = {
      key1: 42,
      key2: 'string',
      key3: true,
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: 42,
      key2: 'string',
      key3: true,
    });
  });

  it('handles mixed objects with localizable and non-localizable properties', () => {
    const values = {
      key1: { localize: (locale: string) => `value1 for ${locale}` },
      key2: 42,
      key3: 'string',
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: 'value1 for en-US',
      key2: 42,
      key3: 'string',
    });
  });

  it('returns an empty object when input is an empty object', () => {
    expect(localizeObject({}, 'en-US')).toEqual({});
  });

  it('handles null values in the object gracefully', () => {
    const values = {
      key1: null,
      key2: { localize: (locale: string) => `value for ${locale}` },
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: null,
      key2: 'value for en-US',
    });
  });

  it('handles undefined values in the object gracefully', () => {
    const values = {
      key1: undefined,
      key2: { localize: (locale: string) => `value for ${locale}` },
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: undefined,
      key2: 'value for en-US',
    });
  });

  it('returns original values for objects with non-function localize properties', () => {
    const values = {
      key1: { localize: 'not a function' },
      key2: { localize: (locale: string) => `value for ${locale}` },
    };
    expect(localizeObject(values, 'en-US')).toEqual({
      key1: { localize: 'not a function' },
      key2: 'value for en-US',
    });
  });
});
