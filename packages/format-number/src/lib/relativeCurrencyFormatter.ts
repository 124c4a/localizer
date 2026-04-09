/*
 * Copyright 2026 Artem Godin.
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
import { RelativeValueFormatter } from '@localizer/core';

import { _buildFormatter } from './_/build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * Formats values relative to a reference as localized currency strings.
 *
 * @typeParam T - The numeric type, either `number` or `bigint`.
 *
 * @param   currency - The currency code (e.g., 'USD', 'EUR').
 * @param   options  - Optional formatting options.
 *
 * @returns          A function to format a value relative to a reference.
 *
 * @public
 */
export function relativeCurrencyFormatter<T extends number | bigint>(
  currency: CurrencyCode,
  options?: NumberFormatOptions,
): RelativeValueFormatter<T> {
  const innerFormatter = _buildFormatter(
    {
      ...(options ?? {}),
      currency,
      signDisplay: 'exceptZero',
    },
    'currency',
  );

  return (reference, value) => innerFormatter(value - reference);
}
