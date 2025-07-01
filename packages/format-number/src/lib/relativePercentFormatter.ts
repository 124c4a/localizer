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

/**
 * Formats values as localized relative percentages.
 *
 * @typeParam T - The numeric type, either `number` or `bigint`.
 *
 * @param   options - Optional formatting options.
 *
 * @returns         A function to format a value relative to a reference as a
 *   percentage.
 *
 * @public
 */
export function relativePercentFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): RelativeValueFormatter<T> {
  const innerFormatter = _buildFormatter(
    {
      ...(options ?? {}),
      signDisplay: 'exceptZero',
    },
    'percent',
  );

  return (value, reference) => {
    if (value === reference) {
      return innerFormatter(0);
    } else if (reference == 0) {
      return innerFormatter(value > 0 ? +Infinity : -Infinity);
    } else {
      return innerFormatter((value - reference) / reference);
    }
  };
}
