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
import { Localizable } from './localizable.js';

/**
 * @public
 *
 * Represents a localizer interface that provides methods for formatting and localizing values.
 * The `Localizer` interface supports various types of formatters and localizable objects.
 *
 * @see {@link Localizable}
 */
export interface Localizer {
  /**
   * @public
   *
   * Localizes a value based on the selected locale.
   *
   * @typeParam T - The type of the localized value.
   * @param localizable - A `Localizable` object.
   *
   * @returns The localized value of type `T`.
   */
  <T>(localizable: Localizable<T>): T;
  /**
   * @public
   *
   * Localizes a function returning a localizable value based on the selected locale.
   *
   * @typeParam T - The type of the localized value.
   * @typeParam A - The type of the arguments for the function.
   * @param formatter - A function that takes arguments of type `A` and returns a `Localizable<T>`.
   * @returns A function that takes arguments of type `A` and returns a localized value of type `T`.
   */
  <A extends unknown[], T>(
    formatter: (...args: A) => Localizable<T>,
  ): (...args: A) => T;

  /**
   * The selected locale code.
   */
  readonly locale: LocaleCode;
}
