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
import { LocaleCode, Localizable, Localized } from '@localizer/core';
export interface LocalizerInstance {
  /**
   * Returns the localized value for the given input.
   *
   * @typeParam T - Type of the localized value.
   *
   * @param   localizable - The input to localize.
   *
   * @returns             Localized value of type `T`.
   *
   * @alpha
   */
  localize<T>(localizable: Localizable<T>): T;

  /**
   * Localizes a function that returns a localizable value.
   *
   * @typeParam T - The localized value type.
   * @typeParam A - The argument types for the function.
   *
   * @param   formatter - A function accepting arguments of type `A` and returning `Localizable<T>`.
   *
   * @returns           A function accepting arguments of type `A` and returning `T`.
   *
   * @alpha
   */
  localize<A extends unknown[], T>(formatter: (...args: A) => Localizable<T>): (...args: A) => T;

  /**
   * Localizes an array of values using the given locale.
   *
   * @typeParam T - Type of the array elements.
   *
   * @param   values - Array of values to localize.
   *
   * @returns        Localized array.
   *
   * @alpha
   *
   * @see {@link Localizable}
   */
  localizeArray<T extends unknown[]>(values: T): Localized<T>;

  /**
   * Localizes an object's properties by converting `Localizable` values to their localized forms.
   *
   * @typeParam T - The input object type with properties that may be `Localizable`.
   *
   * @param   values - The object with properties to localize.
   *
   * @returns        A new object with `Localizable` properties replaced by localized values.
   *
   * @public
   *
   * @see {@link Localizable}
   */
  localizeObject<T extends Record<string, unknown>>(values: T): Localized<T>;

  activeLocale: LocaleCode;
}
