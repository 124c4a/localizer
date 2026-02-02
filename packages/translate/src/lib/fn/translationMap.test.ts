/*
 * Copyright 2026 Artem Godin.
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

import { translationMap } from './translationMap.js';

const staticTranslation = translationMap({
  en: 'Hello',
  fi: 'Hei',
  sv: 'Hej',
});

const staticTranslationWithLocalizables = translationMap({
  en: loc`Hello`,
  fi: loc`Hei`,
  sv: loc`Hej`,
});

const dynamicTranslation = translationMap((value: unknown) => ({
  en: `Hello, ${value}`,
  fi: `Hei ${value}`,
}));
const anonymousDynamicTranslation = translationMap((value: unknown) => ({
  en: `Hello, ${value}`,
  fi: `Hei ${value}`,
}));

const emptyTranslationWithoutKey = translationMap({});

describe('translationMap', () => {
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
    expect(anonymousDynamicTranslation('Anna').localize(null)).toBe('("Anna")');
    expect(dynamicTranslation('Anna').localize(null)).toBe('("Anna")');
    expect(dynamicTranslation(decimal(5)).localize(null)).toBe('("5")');
    expect(dynamicTranslation(Math.PI).localize(null)).toBe('(3.141592653589793)');
    expect(dynamicTranslation([1, decimal(3)]).localize(null)).toBe('([1,"3"])');
    expect(dynamicTranslation({ a: 1, b: decimal(3) }).localize(null)).toBe('({"a":1,"b":"3"})');
  });

  it('returns fallback for empty translation map', () => {
    expect(emptyTranslationWithoutKey.localize('en')).toBe('[translationMap]');
    expect(emptyTranslationWithoutKey.localize(null)).toBe('[translationMap]');
  });
});
