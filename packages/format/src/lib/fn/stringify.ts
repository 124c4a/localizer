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
 * @public
 *
 * Converts an unknown value into a `Localizable` object.
 *
 * This function is useful for converting various types of values (like numbers, strings, objects, etc.)
 * into a format that can be localized. The resulting `Localizable` object can be used in templates
 * or components that require localization support.
 *
 * @param value - The value to be converted. Can be of any type.
 * @returns A `Localizable` object that, when localized, returns the string representation of the value.
 * If the locale is `null`, it returns the placeholder string '[stringify]'.
 */
export function stringify(value: unknown): Localizable {
  return loc((locale) => (locale === null ? '[stringify]' : String(value)));
}
