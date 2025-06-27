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
import { DateTimeFormatOptions } from './options.js';

/**
 * @public
 *
 * Creates a formatter for localized date-time values.
 *
 * @typeParam T - The type of the value to be formatted, either a number (timestamp) or a Date object.
 * @param options - An optional object specifying the formatting options for date-time values.
 * @returns A ValueFormatter function that formats a single date-time value into a localized string.
 *
 * This function utilizes the `buildFormatter` utility to construct the formatter.
 * If no options are provided, it defaults to an empty configuration.
 */
export function dateTimeFormatter<T extends number | Date>(
  options?: DateTimeFormatOptions,
): ValueFormatter<T> {
  return _buildFormatter(options ?? {});
}
