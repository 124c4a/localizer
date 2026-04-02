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
import { NumberFormatOptions } from './options.js';
import { Unit } from './unit.js';

/**
 * Creates a formatter for localized unit values.
 *
 * @typeParam T - The type of values to format (number or bigint).
 *
 * @param   options - Optional formatting options.
 *
 * @returns         A `UnitValueFormatter` for localized unit strings.
 *
 * @public
 */
export function unitFormatter<T extends number | bigint>(
  options?: NumberFormatOptions,
): UnitValueFormatter<T, Unit> {
  return _buildUnitFormatter(options ?? {}, 'unit', 'unit');
}
