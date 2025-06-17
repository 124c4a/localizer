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
import { Localizable, loc } from '@localizer/core';

/**
 * Applies a transformation function to the localized value of a Localizable object.
 *
 * @template T - The type of the value contained within the Localizable object.
 * @param value - A Localizable object containing the value to be transformed.
 * @param fn - A function that takes a value of type T and returns a transformed value of type T.
 * @returns A new Localizable object with the transformed value for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `Hello ${locale}`);
 * const transformedValue = apply(localizedValue, value => value.toUpperCase());
 * console.log(transformedValue.localize('en')); // Output: HELLO EN
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export function apply<T>(
  value: Localizable<T>,
  fn: (value: T) => T
): Localizable<T> {
  return loc((locale) => fn(value.localize(locale)));
}
