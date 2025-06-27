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
import { getPrimaryLocale, Localizable, loc } from '@localizer/core';

/**
 * @beta
 * Transforms a Localizable value to use the primary locale.
 *
 * @typeParam T - Type of the value in the Localizable object.
 * @param value - The Localizable object to transform.
 * @returns A new Localizable object using the primary locale.
 *
 * @example
 * const localizedValue = loc(locale => `Hello ${locale}`);
 * const primaryLocaleValue = usePrimaryLocale(localizedValue);
 * console.log(primaryLocaleValue.localize('sv-FI')); // Output: Hello fi-FI
 */
export function usePrimaryLocale<T>(value: Localizable<T>): Localizable<T> {
  return loc((locale) =>
    value.localize(locale !== null ? getPrimaryLocale(locale) : null),
  );
}
