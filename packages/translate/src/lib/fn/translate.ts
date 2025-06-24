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
import {
  LocaleCode,
  Localizable,
  loc,
  getLocaleChain,
  ValueFormatter,
  isLocalizable,
} from '@localizer/core';

/**
 * Type definition for a translation map.
 *
 * Represents a mapping of locale codes to their corresponding translations.
 * Each locale code can be associated with either a string or a localizable value.
 *
 * @template K - The locale code type.
 *
 * @alpha
 * @see {@link translate}
 */
export type TranslationMap = {
  readonly [K in LocaleCode]?: string | Localizable;
};

/**
 * Translation function for dynamic values.
 *
 * Creates a value formatter that dynamically generates a translation map based on the input value.
 *
 * @template V - The type of the input value.
 * @param map - A function that generates a translation map for the given value.
 * @param translationKey - An optional key used as a fallback translation.
 * @returns A function that formats the input value into a localized string.
 *
 * @example
 * const dynamicMap = (value) => ({ en: `Value: ${value}`, fr: `Valeur: ${value}` });
 * const formatter = translate(dynamicMap);
 * console.log(formatter(42).localize("fr")); // Output: "Valeur: 42"
 *
 * @alpha
 * @see {@link TranslationMap}
 */
export function translate<V>(
  map: (value: V) => TranslationMap,
  translationKey?: string,
): ValueFormatter<V>;
/**
 * Translation function for static maps.
 *
 * Resolves the appropriate translation for the current locale based on the provided translation map.
 *
 * @param map - A static translation map containing locale codes and their translations.
 * @param translationKey - An optional key used as a fallback translation.
 * @returns A localized string based on the current locale.
 *
 * @example
 * const staticMap = { en: "Hello", fr: "Bonjour" };
 * const localized = translate(staticMap);
 * console.log(localized.localize("en")); // Output: "Hello"
 *
 * @alpha
 * @see {@link TranslationMap}
 */
export function translate(
  map: TranslationMap,
  translationKey?: string,
): Localizable;
/**
 * Translation function that can handle both static and dynamic translation maps.
 * @param map
 * @param translationKey
 * @internal
 */
export function translate<V>(
  map: TranslationMap | ((value: V) => TranslationMap),
  translationKey?: string,
): Localizable | ValueFormatter<V> {
  if (typeof map === 'function') {
    return (value: V) => translate(map(value), translationKey);
  } else {
    return loc((locale) => {
      if (!locale) {
        return translationKey ?? '[anonymous translation]';
      }

      const translation =
        getLocaleChain(locale)
          .map((it) => map[it])
          .find((it) => it !== undefined) ??
        translationKey ??
        '[anonymous translation]';

      if (isLocalizable(translation)) {
        return translation.localize(locale);
      } else {
        return translation;
      }
    });
  }
}
