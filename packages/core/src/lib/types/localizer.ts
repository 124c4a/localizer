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
import { LocaleCode } from '../consts/locale.js';
import { Localizable } from './localizable.js';

/**
 * Interface for localizing values and formatting functions. Supports various types of localizable
 * objects and formatters.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export interface Localizer {
  /**
   * Returns the localized value for the given input.
   *
   * @typeParam T - Type of the localized value.
   *
   * @param   localizable - The input to localize.
   *
   * @returns             Localized value of type `T`.
   *
   * @public
   */
  <T>(localizable: Localizable<T>): T;

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
   * @public
   */
  <A extends unknown[], T>(formatter: (...args: A) => Localizable<T>): (...args: A) => T;

  /**
   * The selected locale code.
   *
   * @public
   */
  readonly locale: LocaleCode;
}
