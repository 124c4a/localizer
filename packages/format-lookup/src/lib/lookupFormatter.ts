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
import { isLocalizable, Localizable, ValueFormatter } from '@localizer/core';

/**
 * Key used in a lookup table to represent `undefined` values.
 *
 * @beta
 *
 * @see {@link LookupTable} , {@link lookupFormatter}
 */
export const UndefinedValue: unique symbol = Symbol();

/**
 * Key used in a lookup table to represent `null` values.
 *
 * @beta
 *
 * @see {@link LookupTable} , {@link lookupFormatter}
 */
export const NullValue: unique symbol = Symbol();

/**
 * Symbol representing both `undefined` and `null` values in a lookup table.
 *
 * @beta
 *
 * @see {@link LookupTable} , {@link lookupFormatter}
 */
export const NoValue: unique symbol = Symbol();

/**
 * Symbol used as a fallback key in a lookup table when no other key matches.
 *
 * @beta
 *
 * @see {@link LookupTable} , {@link lookupFormatter}
 */
export const DefaultValue: unique symbol = Symbol();

/**
 * Defines a lookup table for mapping values to localizable content or formatters.
 *
 * @typeParam T - The type of values the lookup table supports.
 *
 * @beta
 *
 * @see {@link lookupFormatter}
 * @see {@link UndefinedValue}
 * @see {@link NullValue}
 * @see {@link NoValue}
 * @see {@link DefaultValue}
 */
export type LookupTable<T> = {
  [K in T extends string | number ? T : never]?: Localizable | ValueFormatter<K>;
} & {
  [K in typeof UndefinedValue | typeof NoValue | typeof NullValue]?: Localizable;
} & {
  [K in typeof DefaultValue]?: Localizable | ValueFormatter<T>;
};

/**
 * Creates a formatter that selects formatting logic based on the input value.
 *
 * Special symbols (`NoValue`, `UndefinedValue`, `NullValue`, `DefaultValue`) handle cases like
 * `undefined`, `null`, or fallback values.
 *
 * @typeParam T - The type of values the formatter supports.
 *
 * @param   lut - Lookup table mapping values to localizable content or formatters.
 *
 * @returns     A function that formats the input value using the lookup table.
 *
 * @throws      If the value is not in the lookup table and no default is specified.
 *
 * @beta
 */
export function lookupFormatter<T>(lut: LookupTable<T>): ValueFormatter<T> {
  return (value) => {
    let result;
    if (value === undefined) {
      result = lut[UndefinedValue] ?? lut[NoValue];
    } else if (value === null) {
      result = lut[NullValue] ?? lut[NoValue];
    } else {
      result = lut[value];
    }
    result = result ?? lut[DefaultValue];
    if (!result) {
      throw new RangeError(
        `Value ${value} is not represented in [${[...Object.keys(lut)].join(', ')}], but no default value is specified`,
      );
    }
    if (isLocalizable(result)) {
      return result;
    } else {
      return result(value);
    }
  };
}
