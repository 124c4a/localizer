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
import { RelativeValueFormatter } from '@localizer/core';

import { _buildFormatter } from './_/build.js';
import { NumberFormatOptions } from './options.js';
import { Unit } from './unit.js';

/**
 * @public
 * Formats values relative to a reference using localized units.
 *
 * @typeParam T - The numeric type, either `number` or `bigint`.
 * @param unit - The unit for formatting (e.g., 'meter', 'kilogram').
 * @param options - Optional formatting settings.
 * @returns A function that formats a value relative to a reference.
 */
export function relativeUnitFormatter<T extends number | bigint>(
  unit: Unit,
  options?: NumberFormatOptions,
): RelativeValueFormatter<T> {
  const innerFormatter = _buildFormatter(
    {
      ...(options ?? {}),
      unit,
      signDisplay: 'exceptZero',
    },
    'unit',
  );

  return (value, reference) => innerFormatter(value - reference);
}
