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
import { Localized } from '../../types/localizable.js';
import { isLocalizable } from './is-localizable.js';

/**
 * @public
 *
 * Localizes the properties of an object by resolving `Localizable` values to their localized representations.
 *
 * @typeParam T - The type of the input object, where properties can be `Localizable` or other types.
 * @param values - The object containing properties to be localized.
 * @param locale - The locale code used for localization. If `null`, a default or fallback value may be used.
 * @returns A new object where all `Localizable` properties are replaced with their localized values.
 *
 * @example
 * ```typescript
 * // Example with an object containing localizable properties
 * const values = {
 *   greeting: loc((locale) => locale === 'en' ? 'Hello' : 'Hola'),
 *   farewell: loc((locale) => locale === 'en' ? 'Goodbye' : 'Adiós'),
 * };
 * const localizedValues = localizeObject(values, 'en');
 * console.log(localizedValues);
 * // Output: { greeting: 'Hello', farewell: 'Goodbye' }
 * ```
 *
 * @example
 * ```typescript
 * // Example with mixed properties
 * const values = {
 *   greeting: loc((locale) => locale === 'en' ? 'Hello' : 'Hola'),
 *   age: 25,
 * };
 * const localizedValues = localizeObject(values, 'en');
 * console.log(localizedValues);
 * // Output: { greeting: 'Hello', age: 25 }
 * ```
 *
 * @see {@link Localizable}
 */
export function localizeObject<T extends Record<string, unknown>>(
  values: T,
  locale: LocaleCode | null,
): Localized<T> {
  const result: Partial<Record<string, unknown>> = { ...values };
  Object.entries(result).forEach(([key, value]) => {
    if (isLocalizable(value)) {
      result[key] = value.localize(locale);
    }
  });
  return result as Localized<T>;
}
