import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';
import { RelativeValueFormatter } from '@localizer/core';
import { CurrencyCode } from './currency.js';

/**
 * Creates a formatter for localized relative currency values.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param currency - The currency code to be used for formatting (e.g., 'USD', 'EUR').
 * @param options - An optional object specifying the formatting options for relative currency values.
 * @returns A `RelativeValueFormatter` function that formats a value relative to a reference value into a localized currency string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `currency` style and `signDisplay: 'exceptZero'`
 * to generate localized relative currency strings. It calculates the difference between the value and the reference
 * before formatting.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = relativeCurrencyFormatter('USD', options);
 * const formattedValue = formatter(1500, 1000);
 * console.log(formattedValue.localize('en')); // Output: +$500.00
 *
 * @public
 * @see {@link RelativeValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function relativeCurrencyFormatter<T extends number | bigint>(
  currency: CurrencyCode,
  options?: NumberFormatOptions
): RelativeValueFormatter<T> {
  const innerFormatter = buildFormatter({
    ...(options ?? {}),
    style: 'currency',
    currency,
    signDisplay: 'exceptZero',
  });

  return (value, reference) => innerFormatter(value - reference);
}
