import { ValueFormatter } from '@localizer/core';

import { buildFormatter } from './build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized fixed currency values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param currency - The currency code to be used for formatting (e.g., 'USD', 'EUR').
 * @param options - An optional object specifying the formatting options for currency values.
 * @returns A `ValueFormatter` function that formats a number into a localized fixed currency string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `currency` style to generate localized currency strings.
 * It ensures the specified currency is fixed and consistent across all formatted values.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = fixedCurrencyFormatter('USD', options);
 * const formattedValue = formatter(1234.56);
 * console.log(formattedValue.localize('en')); // Output: $1,234.56
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function fixedCurrencyFormatter<T extends number | bigint>(
  currency: CurrencyCode,
  options?: NumberFormatOptions
): ValueFormatter<T> {
  return buildFormatter({ ...(options ?? {}), style: 'currency', currency });
}
