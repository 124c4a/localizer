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
import { ValueRangeFormatter } from '@localizer/core';

import { _buildRangeFormatter } from './_/build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * @public
 *
 * Creates a formatter for localized fixed currency ranges.
 *
 * @typeParam T - The type of the values to be formatted, either numbers or bigints.
 * @param currency - The currency code to be used for formatting (e.g., 'USD', 'EUR').
 * @param options - An optional object specifying the formatting options for currency ranges.
 * @returns A `ValueRangeFormatter` function that formats a range of numbers into a localized fixed currency string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `currency` style to generate localized currency range strings.
 * It ensures the specified currency is fixed and consistent across all formatted values in the range.
 */
export function fixedCurrencyRangeFormatter<T extends number | bigint>(
  currency: CurrencyCode,
  options?: NumberFormatOptions,
): ValueRangeFormatter<T> {
  return _buildRangeFormatter(
    {
      ...(options ?? {}),
      currency,
    },
    'currency',
  );
}
