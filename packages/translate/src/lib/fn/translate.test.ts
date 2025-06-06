import { loc } from '@localizer/core';
import { translate } from './translate.js';

const staticTranslation = translate({
  en: 'Hello',
  fi: 'Hei',
  sv: 'Hej',
});

const staticTranslationWithLocalizables = translate({
  en: loc`Hello`,
  fi: loc`Hei`,
  sv: loc`Hej`,
});

const dynamicTranslation = translate((value: string) => ({
  en: `Hello, ${value}`,
  fi: `Hei ${value}`,
}));

const emptyTranslationWithKey = translate({}, 'emptyTranslationWithKey');
const emptyTranslationWithoutKey = translate({});

describe('translate function', () => {
  it('returns translation for the given locale', () => {
    expect(staticTranslation.localize('en')).toBe('Hello');
    expect(staticTranslation.localize('fi')).toBe('Hei');
    expect(staticTranslation.localize('sv-FI')).toBe('Hej');
  });

  it('returns fallback translation when locale is missing', () => {
    expect(staticTranslation.localize('de')).toBe('Hello');
  });

  it('handles nested localizable objects', () => {
    expect(staticTranslationWithLocalizables.localize('en')).toBe('Hello');
  });

  it('handles function-based translation maps', () => {
    expect(dynamicTranslation('Anna').localize('en')).toBe('Hello, Anna');
    expect(dynamicTranslation('Anna').localize('fi')).toBe('Hei Anna');
  });

  it('returns fallback for empty translation map', () => {
    expect(emptyTranslationWithKey.localize('en')).toBe(
      'emptyTranslationWithKey'
    );
    expect(emptyTranslationWithoutKey.localize('en')).toBe(
      '[anonymous translation]'
    );
  });
});
