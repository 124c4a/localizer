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
 * Converts the localized value to lowercase for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value converted to lowercase for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `HELLO ${locale}`);
 * const lowerCasedValue = lowerCase(localizedValue);
 * console.log(lowerCasedValue.localize('en')); // Output: hello en
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export function lowerCase(value: Localizable): Localizable {
  return loc((locale) =>
    locale === null
      ? value.localize(locale)
      : value.localize(locale).toLocaleLowerCase(locale),
  );
}
