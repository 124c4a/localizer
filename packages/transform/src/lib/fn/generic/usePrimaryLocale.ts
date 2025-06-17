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
 * Adjusts the localized value to use the primary locale derived from the given locale.
 *
 * @template T - The type of the value contained within the Localizable object.
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value adjusted to use the primary locale.
 *
 * @example
 * const localizedValue = loc(locale => `Hello ${locale}`);
 * const primaryLocaleValue = usePrimaryLocale(localizedValue);
 * console.log(primaryLocaleValue.localize('sv-FI')); // Output: Hello fi-FI
 *
 * @public
 * @see {@link Localizable}, {@link transform}, {@link getPrimaryLocale}
 */
export function usePrimaryLocale<T>(value: Localizable<T>): Localizable<T> {
  return loc((locale) =>
    value.localize(locale !== null ? getPrimaryLocale(locale) : null)
  );
}
