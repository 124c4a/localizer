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
 * Converts a localized value to uppercase.
 *
 * @param value - The Localizable object to transform. No transformation occurs for a `null` locale.
 * @returns A Localizable object with the value in uppercase for the given locale.
 */
export function upperCase(value: Localizable): Localizable {
  return loc((locale) =>
    locale === null
      ? value.localize(locale)
      : value.localize(locale).toLocaleUpperCase(locale),
  );
}
