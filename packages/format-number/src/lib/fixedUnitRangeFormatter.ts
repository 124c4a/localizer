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
import { ValueRangeFormatter } from '@localizer/core';

import { _buildRangeFormatter } from './_/build.js';
import { NumberFormatOptions } from './options.js';
import { Unit } from './unit.js';

/**
 * Creates a formatter for fixed unit ranges using localization.
 *
 * @typeParam T - The type of values to format, either `number` or `bigint`.
 *
 * @param   unit    - The unit for formatting (e.g., 'meter', 'kilogram').
 * @param   options - Optional formatting options for the unit range.
 *
 * @returns         A `ValueRangeFormatter` that formats a range of values with a fixed unit.
 *
 * @public
 */
export function fixedUnitRangeFormatter<T extends number | bigint>(
  unit: Unit,
  options?: NumberFormatOptions,
): ValueRangeFormatter<T> {
  return _buildRangeFormatter(
    {
      ...(options ?? {}),
      unit,
    },
    'unit',
  );
}
