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
import { RelativeValueFormatter } from '@localizer/core';

import { _buildFormatter } from './_/build.js';
import { NumberFormatOptions } from './options.js';

/**
 * @public
 *
 * Creates a formatter for localized relative percentage values.
 *
 * @typeParam T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An optional object specifying the formatting options for relative percentage values.
 * @returns A `RelativeValueFormatter` function that formats a value relative to a reference value into a localized percentage string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `percent` style and `signDisplay: 'exceptZero'`
 * to generate localized relative percentage strings. It calculates the relative difference between the value and the reference
 * before formatting. If the reference is zero, it returns `Infinity` or `-Infinity` based on the sign of the value.
 */
export function relativePercentFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): RelativeValueFormatter<T> {
  const innerFormatter = _buildFormatter(
    {
      ...(options ?? {}),
      signDisplay: 'exceptZero',
    },
    'percent',
  );

  return (value, reference) => {
    if (reference == 0) {
      return innerFormatter(value > 0 ? +Infinity : -Infinity);
    } else {
      return innerFormatter((value - reference) / reference);
    }
  };
}
