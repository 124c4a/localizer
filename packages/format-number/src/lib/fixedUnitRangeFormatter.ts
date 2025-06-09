import { buildRangeFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';
import { ValueRangeFormatter } from '@localizer/core';
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
  options?: NumberFormatOptions
): ValueRangeFormatter<T> {
  return buildRangeFormatter({
    ...(options ?? {}),
    style: 'unit',
    unit,
  });
}
