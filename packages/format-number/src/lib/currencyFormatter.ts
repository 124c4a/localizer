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
import { UnitValueFormatter } from '@localizer/core';

import { _buildUnitFormatter } from './_/build.js';
import { CurrencyCode } from './currency.js';
import { NumberFormatOptions } from './options.js';

/**
 * Formats currency values using localization.
 *
 * @typeParam T - The value type, either number or bigint.
 *
 * @param   options - Optional formatting options.
 *
 * @returns         A `UnitValueFormatter` for localized currency strings.
 *
 * @public
 */
export function currencyFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): UnitValueFormatter<T, CurrencyCode> {
  return _buildUnitFormatter(options ?? {}, 'currency', 'currency');
}
