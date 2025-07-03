/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { loc } from '@localizer/core';
import { decimal } from '@localizer/format';

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

const dynamicTranslation = translate(
  (value: unknown) => ({
    en: `Hello, ${value}`,
    fi: `Hei ${value}`,
  }),
  'dynamicTranslation',
);
const anonymousDynamicTranslation = translate((value: unknown) => ({
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

  it('handles function-based translation maps when used with TestLocalizer', () => {
    expect(anonymousDynamicTranslation('Anna').localize(null)).toBe(
      '[anonymous translation]("Anna")',
    );
    expect(dynamicTranslation('Anna').localize(null)).toBe('dynamicTranslation("Anna")');
    expect(dynamicTranslation(decimal(5)).localize(null)).toBe('dynamicTranslation("5")');
    expect(dynamicTranslation(Math.PI).localize(null)).toBe(
      'dynamicTranslation(3.141592653589793)',
    );
    expect(dynamicTranslation([1, decimal(3)]).localize(null)).toBe('dynamicTranslation([1,"3"])');
    expect(dynamicTranslation({ a: 1, b: decimal(3) }).localize(null)).toBe(
      'dynamicTranslation({"a":1,"b":"3"})',
    );
  });

  it('returns fallback for empty translation map', () => {
    expect(emptyTranslationWithKey.localize('en')).toBe('emptyTranslationWithKey');
    expect(emptyTranslationWithoutKey.localize('en')).toBe('[anonymous translation]');
    expect(emptyTranslationWithKey.localize(null)).toBe('emptyTranslationWithKey');
    expect(emptyTranslationWithoutKey.localize(null)).toBe('[anonymous translation]');
  });
});

describe('translation function', () => {
  it('returns a localized string based on the provided translation map', () => {
    const translation = translate({
      en: 'Hello',
      fi: 'Hei',
      sv: 'Hej',
    });

    expect(translation.localize('en')).toBe('Hello');
    expect(translation.localize('fi')).toBe('Hei');
    expect(translation.localize('sv-FI')).toBe('Hej');
  });

  it('returns fallback translation when locale is missing', () => {
    const translation = translate({
      en: 'Hello',
      fi: 'Hei',
    });

    expect(translation.localize('de')).toBe('Hello');
  });
});
