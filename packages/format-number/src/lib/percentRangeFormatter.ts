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
  options?: NumberFormatOptions
): ValueRangeFormatter<T> {
  return buildRangeFormatter({ ...(options ?? {}), style: 'percent' });
}
