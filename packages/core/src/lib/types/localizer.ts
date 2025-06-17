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
import { LocaleCode } from '../consts/locale.js';
import {
  RelativeValueFormatter,
  UnitValueFormatter,
  ValueFormatter,
  ValueRangeFormatter,
} from './formatter.js';
import { Localizable } from './localizable.js';

/**
 * Represents a localizer interface that provides methods for formatting and localizing values.
 * The `Localizer` interface supports various types of formatters and localizable objects.
 *
 * @public
 * @interface Localizer
 *
 * @template T - The type of the value to be localized.
 * @template U - The type of the unit for unit-based formatting.
 *
 * @example
 * // Example usage of a Localizable object
 * const localizable = translate({
 *   en: 'Hello',
 *   es: 'Hola',
 *   fr: 'Bonjour',
 * });
 * const localizer = getLocalizer('es');
 * console.log(localizer(localizable)); // Output: Hola
 *
 * @example
 * // Example usage of a ValueFormatter
 * const numberFormatter = decimal;
 * const localizedNumberFormatter = localizer(numberFormatter);
 * console.log(localizedNumberFormatter(1234.56)); // Output: 1,234.56
 *
 * @example
 * // Example usage of a UnitValueFormatter
 * const unitFormatter = unit;
 * const localizedUnitFormatter = localizer(unitFormatter);
 * console.log(localizedUnitFormatter(5, 'meter')); // Output: 5 m
 *
 * @example
 * // Example usage of a ValueRangeFormatter
 * const rangeFormatter = decimalRange;
 * const localizedRangeFormatter = localizer(rangeFormatter);
 * console.log(localizedRangeFormatter(10, 20)); // Output: 10 - 20
 *
 * @example
 * // Example usage of a RelativeValueFormatter
 * const relativeFormatter = relativePercent;
 * const localizedRelativeFormatter = localizer(relativeFormatter);
 * console.log(localizedRelativeFormatter(0.2, 0.1)); // Output: +10%
 *
 * @example
 * // Accessing the locale property
 * const locale = localizer.locale; // Returns the selected locale code
 *
 * @see {@link Localizable}, {@link ValueFormatter}, {@link UnitValueFormatter}, {@link ValueRangeFormatter}, {@link RelativeValueFormatter}
 */
export interface Localizer {
  <T>(formatter: ValueFormatter<T>): (value: T) => string;
  <T, U>(formatter: UnitValueFormatter<T, U>): (value: T, unit: U) => string;
  <T>(formatter: ValueRangeFormatter<T>): (start: T, end: T) => string;
  <T>(formatter: RelativeValueFormatter<T>): (value: T, reference: T) => string;
  <T>(localizable: Localizable<T>): T;

  /**
   * The selected locale code.
   *
   * @type {LocaleCode}
   */
  readonly locale: LocaleCode;
}
