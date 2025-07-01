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
import { ValueFormatter, loc } from '@localizer/core';
import { transform } from '@localizer/transform';

import { DisplayNameFormatOptions } from './options.js';

/**
 * Creates a localized display name formatter.
 *
 * @typeParam T - The value type to format, typically a string.
 *
 * @param   type    - The display name type, e.g., "language", "region",
 *   "script", etc.
 * @param   options - Formatting options, including transformations.
 *
 * @returns         A function to format values into localized display names.
 *
 * @public
 */
export function displayNameFormatter<T extends string>(
  type:
    | 'language'
    | 'region'
    | 'script'
    | 'calendar'
    | 'dateTimeField'
    | 'currency',
  options?: DisplayNameFormatOptions,
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.DisplayNames> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return value;
      }

      formatter[locale] ||= new Intl.DisplayNames(locale, {
        ...options,
        type,
      });

      return formatter[locale].of(value) ?? '';
    });

    return options?.transform ? transform(result, options.transform) : result;
  };
}
