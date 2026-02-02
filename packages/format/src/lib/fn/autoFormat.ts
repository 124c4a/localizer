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
import {
  Configurer,
  declareConfiguration,
  Empty,
  isLocalizable,
  Localizable,
  ValueFormatter,
} from '@localizer/core';

import { date } from '../consts/datetime.js';
import { list } from '../consts/list.js';
import { decimal } from '../consts/number.js';
import { stringify } from './stringify.js';

/**
 * Options for the `autoFormat` function, defining how different types of values should be
 * formatted.
 *
 * @public
 */
export type DefaultFormattersOptions = {
  /**
   * Formatter for numbers and bigints.
   *
   * @defaultValue `decimal`
   *
   * @public
   */
  number: ValueFormatter<number | bigint>;
  /**
   * Formatter for dates.
   *
   * @defaultValue `date`
   *
   * @public
   */
  date: ValueFormatter<Date>;
  /**
   * Formatter for arrays.
   *
   * @defaultValue `list`
   *
   * @public
   */
  array: ValueFormatter<Localizable[]>;
  /**
   * Formatter for booleans.
   *
   * @defaultValue `stringify`
   *
   * @public
   */
  boolean: ValueFormatter<boolean>;
  /**
   * Formatter for strings.
   *
   * @defaultValue `stringify`
   *
   * @public
   */
  string: ValueFormatter<string>;
  /**
   * Formatter for all other types.
   *
   * @defaultValue `stringify`
   *
   * @public
   */
  default: ValueFormatter<unknown>;
};

const [_defaultFormatOptions, _DefaultFormatters] = declareConfiguration<DefaultFormattersOptions>(
  'DefaultFormatters',
  {
    number: decimal,
    date: date,
    array: list,
    boolean: stringify,
    string: stringify,
    default: stringify,
  },
);

/**
 * Updates auto format options.
 *
 * @public
 */
export const DefaultFormatters: Configurer<DefaultFormattersOptions> = _DefaultFormatters;

/**
 * Formats a value into a `Localizable` object based on its type. By default, it uses the following
 * formatters:
 *
 * - Numbers and bigints: formatted with `decimal`.
 * - `Number` objects: formatted using their primitive value.
 * - `Date` objects: formatted with `date`.
 * - Arrays: recursively formatted into a localized list.
 * - `Localizable` values: returned as-is.
 * - `undefined`: represented as `Empty`.
 * - Others: converted to a localized string with `stringify`.
 *
 * @param   value - The value to format.
 *
 * @returns       A `Localizable` object.
 *
 * @public
 */
export function autoFormat(value: unknown): Localizable {
  switch (true) {
    case value === undefined || value === null:
      return Empty;
    case ['number', 'bigint'].includes(typeof value):
      return _defaultFormatOptions.number(value as number | bigint);
    case value instanceof Number:
      return _defaultFormatOptions.number(value.valueOf());
    case value instanceof Date:
      return _defaultFormatOptions.date(value);
    case Array.isArray(value):
      return _defaultFormatOptions.array(value.map((it) => autoFormat(it)));
    case typeof value === 'boolean':
      return _defaultFormatOptions.boolean(value);
    case typeof value === 'string':
      return _defaultFormatOptions.string(value);
    case isLocalizable(value):
      return value;
    default:
      return _defaultFormatOptions.default(value);
  }
}
