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
import { NumberFormatOptions } from './options.js';

/**
 * @public
 * Creates a formatter for localized decimal ranges.
 *
 * @typeParam T - The numeric type, either `number` or `bigint`.
 * @param options - Optional formatting options for decimal ranges.
 * @returns A `ValueRangeFormatter` for localized decimal range strings.
 */
export function decimalRangeFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): ValueRangeFormatter<T> {
  return _buildRangeFormatter(options ?? {}, 'decimal');
}
