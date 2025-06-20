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
import { Unit } from './unit.js';

/**
 * Creates a formatter for localized fixed unit ranges.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param unit - The unit to be used for formatting (e.g., 'meter', 'kilogram').
 * @param options - An optional object specifying the formatting options for unit ranges.
 * @returns A `ValueRangeFormatter` function that formats a range of numbers into a localized fixed unit string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `unit` style to generate localized unit range strings.
 * It ensures the specified unit is fixed and consistent across all formatted values in the range.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const rangeFormatter = fixedUnitRangeFormatter('meter', options);
 * const formattedRange = rangeFormatter(1000, 2000);
 * console.log(formattedRange.localize('en')); // Output: 1,000.00–2,000.00 m
 *
 * @public
 * @see {@link ValueRangeFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function fixedUnitRangeFormatter<T extends number | bigint>(
  unit: Unit,
  options?: NumberFormatOptions,
): ValueRangeFormatter<T> {
  return buildRangeFormatter(
    {
      ...(options ?? {}),
      unit,
    },
    'unit',
  );
}
