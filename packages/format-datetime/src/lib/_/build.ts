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
import { ValueFormatter, ValueRangeFormatter, loc } from '@localizer/core';

import { DateTimeFormatOptions } from '../options.js';

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/**
 * Creates a formatter for localized date-time values.
 *
 * Uses `Intl.DateTimeFormat` for localization. Supports extracting specific parts of the formatted
 * output via the `parts` option and applying transformations with the `transform` property.
 *
 * @typeParam T - The type of the value to format, either a number (timestamp) or a Date object.
 *
 * @param   options - Configuration for date-time formatting.
 *
 * @returns         A function that formats a single date-time value as a localized string.
 *
 * @public
 */
export function _buildFormatter<T extends number | Date>(
  options: DateTimeFormatOptions,
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.DateTimeFormat> = {};

    return loc((locale) => {
      if (!locale) {
        return new Date(value).toISOString();
      }

      formatter[locale] ||= new Intl.DateTimeFormat(locale, options);

      return options.parts !== undefined
        ? formatter[locale]
            .formatToParts(value)
            .filter((part) => options.parts?.includes(part.type))
            .map((part) => part.value)
            .join('')
        : formatter[locale].format(value);
    });
  };
}

/**
 * Builds a formatter for localized date-time ranges based on the provided options.
 *
 * The formatter uses the `Intl.DateTimeFormat` API to generate localized date-time range strings.
 * If the `parts` option is provided, the formatter extracts and joins specific parts of the
 * formatted output. Additionally, a `transform` property can be provided to apply transformations
 * to the formatted result.
 *
 * @typeParam T - The type of the values to be formatted, either numbers (timestamps) or Date
 *   objects.
 *
 * @param   options - An object specifying the formatting options for date-time ranges.
 * @param   source  - Specifies the source of the range parts to include in the formatted output.
 *   Possible values:
 *
 *   - 'startRange': Includes parts from the start of the range.
 *   - 'endRange': Includes parts from the end of the range.
 *   - 'shared': Includes parts shared between the start and end of the range.
 *
 * @returns         A ValueRangeFormatter function that formats a date-time range into a localized
 *   string.
 *
 * @internal
 */
export function _buildRangeFormatter<T extends number | Date>(
  options: DateTimeFormatOptions,
): ValueRangeFormatter<T> {
  return (start, end) => {
    const formatter: Record<string, Intl.DateTimeFormat> = {};

    return loc((locale) => {
      if (!locale) {
        return new Date(start).toISOString() + ' - ' + new Date(end).toISOString();
      }

      formatter[locale] ||= new Intl.DateTimeFormat(locale, options);

      return options.parts !== undefined
        ? formatter[locale]
            .formatRangeToParts(start, end)
            .filter(
              (part) =>
                options.parts?.includes(part.type) ||
                options.parts?.includes(
                  (part.source + '-' + part.type) as ArrayElement<typeof options.parts>,
                ), // Handle parts with source prefix
            )
            .map((part) => part.value)
            .join('')
        : formatter[locale].formatRange(start, end);
    });
  };
}
