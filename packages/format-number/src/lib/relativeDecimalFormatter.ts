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

import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized relative decimal values.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An optional object specifying the formatting options for relative decimal values.
 * @returns A `RelativeValueFormatter` function that formats a value relative to a reference value into a localized decimal string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `decimal` style and `signDisplay: 'exceptZero'`
 * to generate localized relative decimal strings. It calculates the difference between the value and the reference
 * before formatting.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = relativeDecimalFormatter(options);
 * const formattedValue = formatter(1.5, 1.0);
 * console.log(formattedValue.localize('en')); // Output: +0.50
 *
 * @public
 * @see {@link RelativeValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function relativeDecimalFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): RelativeValueFormatter<T> {
  const innerFormatter = buildFormatter({
    ...(options ?? {}),
    style: 'decimal',
    signDisplay: 'exceptZero',
  });

  return (value, reference) => innerFormatter(value - reference);
}
