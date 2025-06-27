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
import { Empty, isLocalizable, Localizable } from '@localizer/core';

import { date } from '../consts/datetime.js';
import { list } from '../consts/list.js';
import { decimal } from '../consts/number.js';
import { stringify } from './stringify.js';

/**
 * @public
 * Formats a value into a `Localizable` object based on its type.
 *
 * - Numbers and bigints: formatted with `decimal`.
 * - `Number` objects: formatted using their primitive value.
 * - `Date` objects: formatted with `date`.
 * - Arrays: recursively formatted into a localized list.
 * - `Localizable` values: returned as-is.
 * - `undefined`: represented as `Empty`.
 * - Others: converted to a localized string with `stringify`.
 *
 * @param value - The value to format.
 * @returns A `Localizable` object.
 */
export function autoFormat(value: unknown): Localizable {
  if (['number', 'bigint'].includes(typeof value)) {
    return decimal(value as number | bigint);
  } else if (value instanceof Number) {
    return decimal(value.valueOf());
  } else if (value instanceof Date) {
    return date(value);
  } else if (Array.isArray(value)) {
    return list(value.map((it) => autoFormat(it)));
  } else if (isLocalizable(value)) {
    return value;
  } else if (value === undefined) {
    return Empty;
  } else {
    return stringify(value);
  }
}
