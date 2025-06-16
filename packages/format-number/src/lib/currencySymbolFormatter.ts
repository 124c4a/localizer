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
import { ValueFormatter, loc } from '@localizer/core';

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
    { ...(options ?? {}), parts: ['currency'] },
    'currency',
    'currency'
  );

  return (value: T) =>
    loc((locale) => innerFormatter(1, value).localize(locale));
}
