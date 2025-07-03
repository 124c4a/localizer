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
import { Localizable, ValueFormatter, loc, localizeArray } from '@localizer/core';

import { ListFormatOptions } from './options.js';

/**
 * Creates a list formatter based on the given options.
 *
 * Supports two modes:
 *
 * - Uses a localized delimiter if `delimiter` is provided.
 * - Falls back to `Intl.ListFormat` for formatting otherwise.
 *
 * @typeParam T - Array elements, must be Localizable.
 *
 * @param   options - Formatting options for the list.
 *
 * @returns         A ValueFormatter that formats a list of Localizable objects.
 *
 * @public
 */
export function listFormatter<T extends Localizable[]>(
  options: ListFormatOptions,
): ValueFormatter<T> {
  if ('delimiter' in options) {
    return (value) => {
      return loc((locale) => {
        if (locale === null) {
          return JSON.stringify(localizeArray(value, locale));
        }

        return localizeArray(value, locale)
          .filter((s) => s !== '')
          .join(options.delimiter.localize(locale));
      });
    };
  } else {
    return (value) => {
      const formatter: Record<string, Intl.ListFormat> = {};

      return loc((locale) => {
        if (locale === null) {
          return JSON.stringify(localizeArray(value, locale));
        }

        formatter[locale] ||= new Intl.ListFormat(locale, options);

        return formatter[locale].format(localizeArray(value, locale));
      });
    };
  }
}
