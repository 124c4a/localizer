import { dictionary } from './dictionary.js';

describe('dictionary function', () => {
  it('creates a dictionary with Localizable objects for static translations', () => {
    const dict = dictionary({
      key1: { en: 'value1', de: 'wert1' },
    });
    expect(dict.key1.localize('en')).toBe('value1');
    expect(dict.key1.localize('de')).toBe('wert1');
  });

  it('creates a dictionary with ValueFormatter objects for dynamic translations', () => {
    const dict = dictionary({
      key1: (value: number) => ({ en: `value ${value}`, de: `wert ${value}` }),
    });
    expect(dict.key1(42).localize('en')).toBe('value 42');
    expect(dict.key1(42).localize('de')).toBe('wert 42');
  });

  it('handles empty dictionaries gracefully', () => {
    const dict = dictionary({});
    expect(dict).toEqual({});
  });

  it('handles mixed static and dynamic translations correctly', () => {
    const dict = dictionary({
      key1: { en: 'static', de: 'statisch' },
      key2: (value: number) => ({
        en: `dynamic ${value}`,
        de: `dynamisch ${value}`,
      }),
    });
    expect(dict.key1.localize('en')).toBe('static');
    expect(dict.key1.localize('de')).toBe('statisch');
    expect(dict.key2(10).localize('en')).toBe('dynamic 10');
    expect(dict.key2(10).localize('de')).toBe('dynamisch 10');
  });
});
