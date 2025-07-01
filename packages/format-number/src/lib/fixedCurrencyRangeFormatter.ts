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
 * Formats a range of numbers or bigints as a fixed currency string.
 *
 * @typeParam T - The type of values to format, either `number` or `bigint`.
 *
 * @param   currency - The currency code (e.g., 'USD', 'EUR').
 * @param   options  - Optional formatting options.
 *
 * @returns          A `ValueRangeFormatter` for localized fixed currency ranges.
 *
 * @public
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
