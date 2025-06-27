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
import { DateTimeFormatOptions } from './options.js';

/**
 * @public
 *
 * Creates a formatter for localized date-time ranges.
 *
 * @typeParam T - The type of the values to be formatted, either numbers (timestamps) or Date objects.
 * @param options - An optional object specifying the formatting options for date-time ranges.
 * @returns A ValueRangeFormatter function that formats a date-time range into a localized string.
 *
 * This function utilizes the `buildRangeFormatter` utility to construct the formatter.
 * If no options are provided, it defaults to an empty configuration.
 */
export function dateTimeRangeFormatter<T extends number | Date>(
  options?: DateTimeFormatOptions,
): ValueRangeFormatter<T> {
  return _buildRangeFormatter(options ?? {});
}
