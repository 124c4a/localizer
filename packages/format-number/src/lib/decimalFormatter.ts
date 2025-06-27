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
import { ValueFormatter } from '@localizer/core';

import { _buildFormatter } from './_/build.js';
import { NumberFormatOptions } from './options.js';

/**
 * @public
 * Formats numbers or bigints as localized decimal strings.
 *
 * @typeParam T - The value type, either `number` or `bigint`.
 * @param options - Optional formatting options for decimals.
 * @returns A `ValueFormatter` for localized decimal strings.
 */
export function decimalFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): ValueFormatter<T> {
  return _buildFormatter(options ?? {}, 'decimal');
}
