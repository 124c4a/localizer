import { coreOptions } from '../locale/options.js';
import { LocalizableValue } from './LocalizableValue.js';

describe('LocalizableValue', () => {
  it('returns localized value for a valid locale', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.localize('en-US')).toBe('value for en-US');
  });

  it('returns default value when locale is an empty array', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = 'en';

    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString([])).toBe('value for en');
  });

  it('returns localized value for the first locale in an array', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString(['fr', 'de'])).toBe('value for fr');
  });

  it('handles Symbol.toPrimitive correctly', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = 'en';

    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(`${value}`).toBe('value for en');
  });

  it('returns localized value for a valid locale in toLocaleString', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString('en-US')).toBe('value for en-US');
  });
});
