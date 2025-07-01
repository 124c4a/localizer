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
 * Builds a localized relative time formatter.
 *
 * Uses `Intl.RelativeTimeFormat` for localization and `computeRelativeTime` for calculating the
 * relative time. Supports granularity via `stops` and optional result transformation via
 * `transform`.
 *
 * @typeParam T - The value type, either a number (timestamp) or a Date.
 *
 * @param   options - Formatting options for relative time.
 *
 * @returns         A function to format relative time into a localized string.
 *
 * @internal
 */
export function _buildFormatter<T extends number | Date>(
  options: RelativeTimeFormatOptions,
): RelativeValueFormatter<T> {
  return (value, reference) => {
    const formatter: Record<string, Intl.RelativeTimeFormat> = {};

    const result = loc((locale) => {
      const relativeTime = _computeRelativeTime(
        value,
        reference,
        options.stops ?? ['year', 'month', 'week', 'day', 'hour', 'minute'],
      );

      if (locale === null) {
        return `${new Date(reference).toISOString()} ${relativeTime.value >= 0 ? '+' : ''}${relativeTime.value} ${relativeTime.stop}`;
      }
      formatter[locale] ||= new Intl.RelativeTimeFormat(locale, options);
      return formatter[locale].format(relativeTime.value, relativeTime.stop);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
