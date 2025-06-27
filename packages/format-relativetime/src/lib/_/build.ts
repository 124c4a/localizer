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
import { loc, RelativeValueFormatter } from '@localizer/core';
import { transform } from '@localizer/transform';

import { RelativeTimeFormatOptions } from '../options.js';
import { _computeRelativeTime } from './computeRelativeTime.js';

/**
 * @internal
 *
 * Builds a formatter for localized relative time values based on the provided options.
 *
 * @typeDef T - The type of the value to be formatted, either a number (timestamp) or a Date object.
 * @param options - An object specifying the formatting options for relative time values.
 * @returns A RelativeValueFormatter function that formats a relative time value into a localized string.
 *
 * The formatter uses the `Intl.RelativeTimeFormat` API to generate localized relative time strings.
 * It calculates the relative time between a reference point and the given value using the `computeRelativeTime` utility.
 * The `stops` option determines the granularity of the relative time (e.g., year, month, day, etc.).
 * Additionally, a `transform` property can be provided to apply transformations to the formatted result.
 */
export function _buildFormatter<T extends number | Date>(
  options: RelativeTimeFormatOptions,
): RelativeValueFormatter<T> {
  return (reference, value) => {
    const formatter: Record<string, Intl.RelativeTimeFormat> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return '[relativeTime]';
      }

      formatter[locale] ||= new Intl.RelativeTimeFormat(locale, options);

      const relativeTime = _computeRelativeTime(
        value,
        reference,
        options.stops ?? ['year', 'month', 'week', 'day', 'hour', 'minute'],
      );
      return formatter[locale].format(relativeTime.value, relativeTime.stop);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
