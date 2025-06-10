import { ValueRangeFormatter } from '@localizer/core';

import { buildRangeFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized decimal ranges.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An optional object specifying the formatting options for decimal ranges.
 * @returns A `ValueRangeFormatter` function that formats a range of numbers into a localized decimal string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `decimal` style to generate localized decimal range strings.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const rangeFormatter = decimalRangeFormatter(options);
 * const formattedRange = rangeFormatter(1000, 2000);
 * console.log(formattedRange.localize('en')); // Output: 1,000.00–2,000.00
 *
 * @public
 * @see {@link ValueRangeFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function decimalRangeFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): ValueRangeFormatter<T> {
  return buildRangeFormatter({ ...(options ?? {}), style: 'decimal' });
}
