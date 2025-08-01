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

/**
 * Creates a localizer function that resolves values to stable, immutable identifiers.
 *
 * @returns A localizer function for stable identifiers.
 *
 * @internal
 */
export function _getTestLocalizer(): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>),
  ): T | ((...args: A) => T) => {
    if (isLocalizable(localizable)) {
      return localizable.localize(null) as T;
    } else if (typeof localizable === 'function') {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(null);
    } else {
      throw new TypeError(
        `Expected a Localizable value or a function returning a Localizable value, got ${typeof localizable}`,
      );
    }
  };

  Object.defineProperty(fn, 'locale', {
    get: () => null,
    enumerable: true,
    configurable: true,
  });

  return fn as Localizer;
}
