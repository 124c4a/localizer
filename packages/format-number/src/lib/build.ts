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
import {
  UnitValueFormatter,
  ValueFormatter,
  ValueRangeFormatter,
  loc,
} from '@localizer/core';
import { transform } from '@localizer/transform';

import { NumberFormatOptions } from './options.js';

/**
 * Builds a formatter for localized number values based on the provided options.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param options - An object specifying the formatting options for number values.
 * @returns A `ValueFormatter` function that formats a number into a localized string.
 *
 * The formatter uses the `Intl.NumberFormat` API to generate localized number strings.
 * If the `parts` option is provided, it filters and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be applied to modify the formatted result.
 *
 * @example
 * const options = { style: 'currency', currency: 'USD' };
 * const formatter = buildFormatter(options);
 * const formattedValue = formatter(1234.56);
 * console.log(formattedValue.localize('en')); // Output: $1,234.56
 *
 * @internal
 * @see {@link NumberFormatOptions}, {@link ValueFormatter}, {@link Intl.NumberFormat}
 */
export function buildFormatter<T extends number | bigint>(
  options: NumberFormatOptions,
  style: 'decimal' | 'currency' | 'percent' | 'unit' = 'decimal',
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.NumberFormat> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return `[${style}]`;
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

    return options.transform ? transform(result, options.transform) : result;
  };
}

/**
 * Builds a formatter for localized number ranges based on the provided options.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An object specifying the formatting options for number ranges.
 * @param source - An optional string indicating the source of the range ('startRange', 'endRange', or 'shared').
 * @returns A `ValueRangeFormatter` function that formats a range of numbers into a localized string.
 *
 * The formatter uses the `Intl.NumberFormat` API to generate localized number range strings.
 * If the `parts` option is provided, it filters and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be applied to modify the formatted result.
 *
 * @example
 * const options = { style: 'decimal' };
 * const rangeFormatter = buildRangeFormatter(options);
 * const formattedRange = rangeFormatter(1000, 2000);
 * console.log(formattedRange.localize('en')); // Output: 1,000–2,000
 *
 * @internal
 * @see {@link NumberFormatOptions}, {@link ValueRangeFormatter}, {@link Intl.NumberFormat}
 */
export function buildRangeFormatter<T extends number | bigint>(
  options: NumberFormatOptions,
  style: 'decimal' | 'currency' | 'percent' | 'unit',
  source?: 'startRange' | 'endRange' | 'shared',
): ValueRangeFormatter<T> {
  return (start, end) => {
    const formatter: Record<string, Intl.NumberFormat> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return `[${style}Range]`;
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
                options.parts?.includes(part.type) &&
                (!source || part.source === source),
            )
            .map((part) => part.value)
            .join('')
        : formatter[locale].formatRange(start, end);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}

/**
 * Builds a formatter for localized unit values based on the provided options.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @template U - The type of the unit to be formatted, represented as a string.
 * @param options - An object specifying the formatting options for unit values.
 * @param unitKey - The key in `NumberFormatOptions` that specifies the unit type.
 * @returns A `UnitValueFormatter` function that formats a unit value into a localized string.
 *
 * The formatter uses the `Intl.NumberFormat` API to generate localized unit strings.
 * If the `parts` option is provided, it filters and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be applied to modify the formatted result.
 *
 * @example
 * const options = { style: 'unit' };
 * const unitFormatter = buildUnitFormatter(options, 'unit');
 * const formattedUnit = unitFormatter(100, 'kilometer');
 * console.log(formattedUnit.localize('en')); // Output: 100 kilometers
 *
 * @internal
 * @see {@link NumberFormatOptions}, {@link UnitValueFormatter}, {@link Intl.NumberFormat}
 */
export function buildUnitFormatter<T extends number | bigint, U extends string>(
  options: NumberFormatOptions,
  style: 'unit' | 'currency',
  unitKey: keyof NumberFormatOptions,
): UnitValueFormatter<T, U> {
  return (value, unit) => {
    const formatter: Record<string, Record<string, Intl.NumberFormat>> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return `[${style}]`;
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

    return options.transform ? transform(result, options.transform) : result;
  };
}
