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
import { Localizer } from '../../types/localizer.js';
import { isLocalizable } from '../localizable/isLocalizable.js';

/**
 * @public
 *
 * Creates a localizer function for a specific locale.
 *
 * The `getLocalizer` function generates a localizer that can be used to localize
 * values or functions returning localizable values based on the provided locale.
 *
 * @param locale - The locale code to use for localization.
 * @returns A localizer function bound to the specified locale.
 *
 * @example
 * ```typescript
 * const localizer = getLocalizer('en');
 * const localizedValue = localizer(loc((locale) => locale === 'en' ? 'Hello' : 'Hola' ));
 * console.log(localizedValue); // Output: Hello
 * ```
 *
 * @example
 * ```typescript
 * const localizer = getLocalizer('en');
 * const localizedFunction = localizer((name) =>
 *   loc((locale) => locale === 'en' ? `Hello, ${name}` : `Hola, ${name}`)
 * );
 * console.log(localizedFunction('John')); // Output: Hello, John
 * ```
 *
 * @see {@link Localizer}, {@link Localizable}, {@link LocaleCode}
 */
export function getLocalizer(locale: LocaleCode): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>),
  ): T | ((...args: A) => T) => {
    if (isLocalizable(localizable)) {
      return localizable.localize(locale) as T;
    } else {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(
          locale,
        );
    }
  };

  fn.locale = locale;

  return fn as Localizer;
}
