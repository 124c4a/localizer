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
import { Unit } from './unit.js';

/**
 * Creates a formatter for localized relative unit values.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param unit - The unit to be used for formatting (e.g., 'meter', 'kilogram').
 * @param options - An optional object specifying the formatting options for relative unit values.
 * @returns A `RelativeValueFormatter` function that formats a value relative to a reference value into a localized unit string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `unit` style and `signDisplay: 'exceptZero'`
 * to generate localized relative unit strings. It calculates the difference between the value and the reference
 * before formatting.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = relativeUnitFormatter('meter', options);
 * const formattedValue = formatter(5, 3);
 * console.log(formattedValue.localize('en')); // Output: +2.00 m
 *
 * @public
 * @see {@link RelativeValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function relativeUnitFormatter<T extends number | bigint>(
  unit: Unit,
  options?: NumberFormatOptions
): RelativeValueFormatter<T> {
  const innerFormatter = buildFormatter({
    ...(options ?? {}),
    style: 'unit',
    unit,
    signDisplay: 'exceptZero',
  });

  return (value, reference) => innerFormatter(value - reference);
}
