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
import { ValueRangeFormatter } from '@localizer/core';

import { buildRangeFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized percentage ranges.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An optional object specifying the formatting options for percentage ranges.
 * @returns A `ValueRangeFormatter` function that formats a range of numbers into a localized percentage string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `percent` style to generate localized percentage range strings.
 * It ensures consistent formatting of percentage values across the range based on the provided options.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const rangeFormatter = percentRangeFormatter(options);
 * const formattedRange = rangeFormatter(0.1, 0.2);
 * console.log(formattedRange.localize('en')); // Output: 10.00–20.00%
 *
 * @public
 * @see {@link ValueRangeFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function percentRangeFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): ValueRangeFormatter<T> {
  return buildRangeFormatter(options ?? {}, 'percent');
}
