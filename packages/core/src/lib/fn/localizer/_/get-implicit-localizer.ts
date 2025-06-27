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
import { Localizable } from '../../../types/localizable.js';
import { Localizer } from '../../../types/localizer.js';
import { isLocalizable } from '../../localizable/is-localizable.js';
import { _ensureImplicitLocalization } from './ensure-implicit-localization.js';

/**
 * @internal
 *
 * Creates a localizer function that uses the implicit locale.
 *
 * This function generates a localizer bound to the locale provided by
 * `ensureImplicitLocalization`. It can localize values or functions
 * returning localizable values without explicitly specifying the locale.
 *
 * @returns A localizer function bound to the implicit locale.
 */
export function _getImplicitLocalizer(): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>),
  ): T | ((...args: A) => T) => {
    const locale = _ensureImplicitLocalization();

    if (isLocalizable(localizable)) {
      return localizable.localize(locale) as T;
    } else {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(
          locale,
        );
    }
  };

  Object.defineProperty(fn, 'locale', {
    get: () => _ensureImplicitLocalization(),
    enumerable: true,
    configurable: true,
  });

  return fn as Localizer;
}
