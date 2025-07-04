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
import { UnitValueFormatter, ValueFormatter, ValueRangeFormatter, loc } from '@localizer/core';

import { NumberFormatOptions } from '../options.js';

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/**
 * Creates a localized number formatter.
 *
 * @typeParam T - The numeric type, either `number` or `bigint`.
 *
 * @param   options - Formatting options for the number.
 *
 * @returns         A `ValueFormatter` that formats numbers as localized strings.
 *
 * @internal
 */
export function _buildFormatter<T extends number | bigint>(
  options: NumberFormatOptions,
  style: 'decimal' | 'currency' | 'percent' | 'unit' = 'decimal',
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.NumberFormat> = {};

    return loc((locale) => {
      if (locale === null) {
        switch (style) {
          case 'currency':
            return JSON.stringify({ value, currency: options.currency });
          case 'unit':
            return JSON.stringify({ value, unit: options.unit });
          case 'percent':
            return JSON.stringify({ value: value * 100, unit: '%' });
          case 'decimal':
          default:
            return JSON.stringify(value);
        }
      }

      formatter[locale] ||= new Intl.NumberFormat(locale, {
        ...options,
        style,
      });

      return options.parts !== undefined
        ? formatter[locale]
            .formatToParts(value)
            .filter((part) => options.parts?.includes(part.type))
            .map((part) => part.value)
            .join('')
        : formatter[locale].format(value);
    });
  };
}

/**
 * Builds a formatter for localized number ranges based on the provided options.
 *
 * The formatter uses the `Intl.NumberFormat` API to generate localized number range strings. If the
 * `parts` option is provided, it filters and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be applied to modify the formatted result.
 *
 * @typeParam T - The type of the values to be formatted, either numbers or bigints.
 *
 * @param   options - An object specifying the formatting options for number ranges.
 * @param   source  - An optional string indicating the source of the range ('startRange',
 *   'endRange', or 'shared').
 *
 * @returns         A `ValueRangeFormatter` function that formats a range of numbers into a
 *   localized string.
 *
 * @internal
 */
export function _buildRangeFormatter<T extends number | bigint>(
  options: NumberFormatOptions,
  style: 'decimal' | 'currency' | 'percent' | 'unit',
): ValueRangeFormatter<T> {
  return (start, end) => {
    const formatter: Record<string, Intl.NumberFormat> = {};

    return loc((locale) => {
      if (locale === null) {
        switch (style) {
          case 'currency':
            return JSON.stringify({
              start,
              end,
              currency: options.currency,
            });
          case 'unit':
            return JSON.stringify({
              start,
              end,
              unit: options.unit,
            });
          case 'percent':
            return JSON.stringify({
              start: start * 100,
              end: end * 100,
              unit: '%',
            });
          case 'decimal':
          default:
            return JSON.stringify({
              start,
              end,
            });
        }
      }

      formatter[locale] ||= new Intl.NumberFormat(locale, {
        ...options,
        style,
      });

      return options.parts !== undefined
        ? formatter[locale]
            .formatRangeToParts(start, end)
            .filter(
              (part) =>
                options.parts?.includes(part.type) ||
                options.parts?.includes(
                  (part.source + '-' + part.type) as ArrayElement<typeof options.parts>,
                ), // Handle parts with source prefix
            )
            .map((part) => part.value)
            .join('')
        : formatter[locale].formatRange(start, end);
    });
  };
}

/**
 * Builds a formatter for localized unit values based on the provided options.
 *
 * The formatter uses the `Intl.NumberFormat` API to generate localized unit strings. If the `parts`
 * option is provided, it filters and joins specific parts of the formatted output. Additionally, a
 * `transform` property can be applied to modify the formatted result.
 *
 * @typeParam T - The type of the value to be formatted, either a number or a bigint.
 * @typeParam U - The type of the unit to be formatted, represented as a string.
 *
 * @param   options - An object specifying the formatting options for unit values.
 * @param   unitKey - The key in `NumberFormatOptions` that specifies the unit type.
 *
 * @returns         A `UnitValueFormatter` function that formats a unit value into a localized
 *   string.
 *
 * @internal
 */
export function _buildUnitFormatter<T extends number | bigint, U extends string>(
  options: NumberFormatOptions,
  style: 'unit' | 'currency',
  unitKey: keyof NumberFormatOptions,
): UnitValueFormatter<T, U> {
  return (value, unit) => {
    const formatter: Record<string, Record<string, Intl.NumberFormat>> = {};

    return loc((locale) => {
      if (locale === null) {
        return JSON.stringify({ value, unit });
      }

      formatter[locale] ||= {};
      formatter[locale][unit] ||= new Intl.NumberFormat(locale, {
        [unitKey]: unit,
        ...options,
        style,
      });

      return options.parts !== undefined
        ? formatter[locale][unit]
            .formatToParts(value)
            .filter((part) => options.parts?.includes(part.type))
            .map((part) => part.value)
            .join('')
        : formatter[locale][unit].format(value);
    });
  };
}
