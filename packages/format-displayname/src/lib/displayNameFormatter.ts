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
 * Creates a formatter for display names based on the provided options.
 *
 * @template T - The type of the value to be formatted, typically a string.
 * @param options - An object specifying the formatting options for display names.
 * @returns A ValueFormatter function that formats a string value into a localized display name.
 *
 * The formatter uses the `Intl.DisplayNames` API to generate localized display names.
 * If the locale is `null`, a fallback string is returned based on the `type` option.
 * Additionally, a `transform` property can be provided to apply transformations to the formatted display name.
 *
 * @example
 * const options = { type: 'region' };
 * const formatter = displayNameFormatter(options);
 * const formattedName = formatter('US');
 * console.log(formattedName.localize('en')); // Output: United States
 *
 * @public
 * @see {@link ValueFormatter}, {@link DisplayNameFormatOptions}, {@link Intl.DisplayNames}
 */
export function displayNameFormatter<T extends string>(
  options: DisplayNameFormatOptions,
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.DisplayNames> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return `[${options.type}]`;
      }

      formatter[locale] ||= new Intl.DisplayNames(locale, {
        ...options,
      });

      return formatter[locale].of(value) ?? '';
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
