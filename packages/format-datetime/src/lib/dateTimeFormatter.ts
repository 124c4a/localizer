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
import { ValueFormatter } from '@localizer/core';

import { _buildFormatter } from './_/build.js';
import { DateTimeFormatOptions } from './options.js';

/**
 * Creates a localized date-time formatter.
 *
 * @typeParam T - The value type, either a number (timestamp) or a Date.
 *
 * @param   options - Optional formatting options.
 *
 * @returns         A function to format a date-time value as a localized string.
 *
 * @public
 */
export function dateTimeFormatter<T extends number | Date>(
  options?: DateTimeFormatOptions,
): ValueFormatter<T> {
  return _buildFormatter(options ?? {});
}
