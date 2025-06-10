import { loc } from '@localizer/core';
import { ValueFormatter } from '@localizer/core';

import { buildUnitFormatter } from './build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for extracting the currency symbol from a currency code.
 *
 * @template T - The type of the currency code to be formatted.
 * @param options - An optional object specifying the formatting options for currency values.
 * @returns A `ValueFormatter` function that formats a currency code into its corresponding symbol.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `currency` style and filters the `currency` part
 * to extract the symbol.
 *
 * @example
 * const formatter = currencySymbolFormatter({});
 * const formattedSymbol = formatter('USD');
 * console.log(formattedSymbol.localize('en')); // Output: $
 *
 * This formatter is useful when you need to display the currency symbol without formatting a specific amount,
 * such as in UI elements where only the symbol is needed.
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function currencySymbolFormatter<T extends CurrencyCode>(
  options?: NumberFormatOptions
): ValueFormatter<T> {
  const innerFormatter = buildUnitFormatter<number, CurrencyCode>(
    { ...(options ?? {}), style: 'currency', parts: ['currency'] },
    'currency'
  );

  return (value: T) =>
    loc((locale) => innerFormatter(1, value).localize(locale));
}
