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
import { LocaleCode } from '../../consts/locale.js';
import { Localizable } from '../../types/localizable.js';
import { LocalizableValue } from './LocalizableValue.js';
import { localizeArray } from './localizeArray.js';
import { UnlocalizableValue } from './UnlocalizableValue.js';

/**
 * Creates a `Localizable` instance based on the provided localization function.
 *
 * @template T - The type of the localized value.
 *
 * @param {(locale: LocaleCode | null) => T} localize - A function that takes a locale code and returns a localized value.
 * @returns {Localizable<T>} A `Localizable` instance representing the localized value.
 *
 * @example
 * // Using a localization function
 * const localizedValue = loc((locale) => locale === 'en' ? 'Hello' : 'Hola');
 * console.log(localizedValue.localize('en')); // 'Hello'
 *
 * @public
 * @see {@link Localizable}, {@link Localizer}
 */
export function loc<T = string>(
  localize: (locale: LocaleCode | null) => T
): Localizable<T>;
/**
 * Creates a `Localizable` instance based on the provided localization template strings.
 *
 * @param {TemplateStringsArray} strings - Template strings.
 * @param {...Localizable[]} expr - The expressions to interpolate into the template strings.
 * @returns {Localizable} A `Localizable` instance representing the localized value.
 *
 * @example
 * // Using template strings
 * const name = loc`John`;
 * const greeting = loc`Hello, ${name}!`;
 * console.log(greeting.localize('en')); // 'Hello, John!'
 *
 * @public
 * @see {@link Localizable}, {@link Localizer}
 */
export function loc(
  strings: TemplateStringsArray,
  ...expr: Localizable[]
): Localizable;
/**
 * @internal
 */
export function loc<T = string>(
  stringsOrLocalize: TemplateStringsArray | ((locale: LocaleCode | null) => T),
  ...expr: Localizable[]
): Localizable<T> {
  if (stringsOrLocalize instanceof Function) {
    return new LocalizableValue<T>(stringsOrLocalize);
  } else if (expr.length === 0) {
    return new UnlocalizableValue(stringsOrLocalize[0] as T) as Localizable<T>;
  } else {
    return new LocalizableValue((locale) =>
      String.raw({ raw: stringsOrLocalize }, ...localizeArray(expr, locale))
    ) as unknown as Localizable<T>;
  }
}
