import { ValueFormatter } from '@localizer/core';
import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized percentage values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param options - An optional object specifying the formatting options for percentage values.
 * @returns A `ValueFormatter` function that formats a number into a localized percentage string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `percent` style to generate localized percentage strings.
 * It ensures consistent formatting of percentage values based on the provided options.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = percentFormatter(options);
 * const formattedValue = formatter(0.1234);
 * console.log(formattedValue.localize('en')); // Output: 12.34%
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function percentFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): ValueFormatter<T> {
  return buildFormatter({ ...(options ?? {}), style: 'percent' });
}
