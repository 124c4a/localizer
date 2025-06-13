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
 * Capitalizes the first character of the localized value for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the first character of the value capitalized for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `hello ${locale}`);
 * const capitalizedValue = capitalize(localizedValue);
 * console.log(capitalizedValue.localize('en')); // Output: Hello en
 *
 * @public
 * @see {@link Localizable}, {@link transform}, {@link upperCase}, {@link lowerCase}
 */
export function capitalize(value: Localizable): Localizable {
  return loc((locale) =>
    value
      .localize(locale)
      .replace(/^\p{CWU}/u, (char) =>
        char.toLocaleUpperCase(locale ?? undefined)
      )
  );
}
