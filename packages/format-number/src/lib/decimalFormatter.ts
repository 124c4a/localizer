import { ValueFormatter } from '@localizer/core';

import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized decimal values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param options - An optional object specifying the formatting options for decimal values.
 * @returns A `ValueFormatter` function that formats a number into a localized decimal string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `decimal` style to generate localized decimal strings.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = decimalFormatter(options);
 * const formattedValue = formatter(1234.56);
 * console.log(formattedValue.localize('en')); // Output: 1,234.56
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function decimalFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): ValueFormatter<T> {
  return buildFormatter({ ...(options ?? {}), style: 'decimal' });
}
