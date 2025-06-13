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
import {
  Localizable,
  ValueFormatter,
  loc,
  localizeArray,
} from '@localizer/core';
import { transform } from '@localizer/transform';

import { ListFormatOptions } from './options.js';

/**
 * Creates a formatter for lists based on the provided options.
 *
 * @template T - The type of the array elements, which must be Localizable objects.
 * @param options - An object specifying the formatting options for the list.
 * @returns A ValueFormatter function that formats a list of Localizable objects according to the specified options.
 *
 * The formatter supports two modes:
 * - If the `delimiter` option is provided, the list is joined using the localized delimiter.
 * - Otherwise, the `Intl.ListFormat` API is used for formatting the list.
 *
 * @example
 * const options = { delimiter: loc` :: ` };
 * const formatter = listFormatter(options);
 * const formattedList = formatter([loc`item1`, loc`item2`, loc`item3`]);
 * console.log(formattedList.localize('en')); // Output: item1 :: item2 :: item3
 *
 * @public
 * @see {@link Localizable}, {@link ValueFormatter}, {@link ListFormatOptions}, {@link Intl.ListFormat}
 */
export function listFormatter<T extends Localizable[]>(
  options: ListFormatOptions
): ValueFormatter<T> {
  if ('delimiter' in options) {
    return (value) => {
      const result = loc((locale) => {
        if (locale === null) {
          return '[list]';
        }

        return localizeArray(value, locale)
          .filter((s) => s !== '')
          .join(options.delimiter.localize(locale));
      });

      return options.transform ? transform(result, options.transform) : result;
    };
  } else {
    return (value) => {
      const formatter: Record<string, Intl.ListFormat> = {};

      const result = loc((locale) => {
        if (locale === null) {
          return '[list]';
        }

        formatter[locale] ||= new Intl.ListFormat(locale, options);

        return formatter[locale].format(localizeArray(value, locale)) ?? value;
      });

      return options.transform ? transform(result, options.transform) : result;
    };
  }
}
