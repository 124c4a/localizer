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
import { RelativeTimeFormatOptions } from './options.js';

/**
 * @public
 *
 * Creates a relative time formatter function.
 *
 * This function generates a formatter for relative time strings based on the provided options.
 * If no options are specified, it defaults to using `{ numeric: 'auto' }`.
 *
 * @param options - Configuration options for the relative time formatter.
 * @returns A formatter function that formats relative time strings.
 */
export function relativeTimeFormatter(
  options?: RelativeTimeFormatOptions,
): RelativeValueFormatter<Date | number> {
  return _buildFormatter(options ?? { numeric: 'auto' });
}
