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

import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';

/**
 * Creates a formatter for localized percentage values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param options - An optional object specifying the formatting options for percentage values.
 * @returns A `ValueFormatter` function that formats a number into a localized percentage string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `percent` style to generate localized percentage strings.
 * It ensures consistent formatting of percentage values based on the provided options.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = percentFormatter(options);
 * const formattedValue = formatter(0.1234);
 * console.log(formattedValue.localize('en')); // Output: 12.34%
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function percentFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): ValueFormatter<T> {
  return buildFormatter(options ?? {}, 'percent');
}
