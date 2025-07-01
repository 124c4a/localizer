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

import { _buildUnitFormatter } from './_/build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter to extract the currency symbol from a currency code.
 *
 * @typeParam T - The currency code type.
 *
 * @param   options - Optional formatting options.
 *
 * @returns         A `ValueFormatter` that maps a currency code to its symbol.
 *
 * @public
 */
export function currencyCodeFormatter<T extends CurrencyCode>(
  options?: NumberFormatOptions,
): ValueFormatter<T> {
  const innerFormatter = _buildUnitFormatter<number, CurrencyCode>(
    { ...(options ?? {}), parts: ['currency'] },
    'currency',
    'currency',
  );

  return (value: T) =>
    loc((locale) => (locale === null ? value : innerFormatter(1, value).localize(locale)));
}
