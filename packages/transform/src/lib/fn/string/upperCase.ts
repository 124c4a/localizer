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
import { Localizable, loc } from '@localizer/core';

/**
 * Converts the localized value to uppercase for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value converted to uppercase for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `hello ${locale}`);
 * const upperCasedValue = upperCase(localizedValue);
 * console.log(upperCasedValue.localize('en')); // Output: HELLO EN
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export function upperCase(value: Localizable): Localizable {
  return loc((locale) =>
    value.localize(locale).toLocaleUpperCase(locale ?? undefined)
  );
}
