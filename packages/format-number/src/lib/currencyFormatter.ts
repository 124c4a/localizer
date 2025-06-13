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
import { UnitValueFormatter } from '@localizer/core';

import { buildUnitFormatter } from './build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

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
