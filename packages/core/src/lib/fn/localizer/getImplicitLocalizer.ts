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
import { Localizable } from '../../types/localizable.js';
import { Localizer } from '../../types/localizer.js';
import { isLocalizable } from '../localizable/isLocalizable.js';
import { ensureImplicitLocalization } from './ensureImplicitLocalization.js';

/**
 * Creates an implicit localizer function that automatically determines the locale.
 *
 * The `getImplicitLocalizer` function generates a localizer that uses the locale
 * provided by the `ensureImplicitLocalization` function. It can localize values
 * or functions returning localizable values without explicitly specifying the locale.
 *
 * @returns {Localizer} A localizer function bound to the implicitly determined locale.
 *
 * @template T - The type of the localized value.
 * @template A - The type of the arguments for functions returning localizable values.
 *
 * @internal
 */
export function getImplicitLocalizer(): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>)
  ): T | ((...args: A) => T) => {
    const locale = ensureImplicitLocalization();

    if (isLocalizable(localizable)) {
      return localizable.localize(locale) as T;
    } else {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(
          locale
        );
    }
  };

  Object.defineProperty(fn, 'locale', {
    get: () => ensureImplicitLocalization(),
    enumerable: true,
    configurable: true,
  });

  return fn as Localizer;
}
