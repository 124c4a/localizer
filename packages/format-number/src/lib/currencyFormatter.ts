import { buildUnitFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';
import { UnitValueFormatter } from '@localizer/core';
import { CurrencyCode } from './currency.js';

/**
 * Creates a formatter for localized currency values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param options - An optional object specifying the formatting options for currency values.
 * @returns A `UnitValueFormatter` function that formats a currency value into a localized string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `currency` style to generate localized currency strings.
 *
 * @example
 * const formatter = currencyFormatter();
 * const formattedCurrency = formatter(1234.56, 'USD');
 * console.log(formattedCurrency.localize('en')); // Output: $1,234.56
 *
 * @public
 * @see {@link NumberFormatOptions}, {@link UnitValueFormatter}, {@link Intl.NumberFormat}
 */
export function currencyFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): UnitValueFormatter<T, CurrencyCode> {
  return buildUnitFormatter(
    { ...(options ?? {}), style: 'currency' },
    'currency'
  );
}
