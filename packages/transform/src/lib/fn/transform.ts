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
import { Localizable } from '@localizer/core';

import { Transformer } from '../types/transform.js';

/**
 * Transforms a Localizable value using a sequence of transformer functions.
 *
 * @typeParam T - Type of the value in the Localizable object.
 *
 * @param   value        - Initial Localizable value.
 * @param   transformers - Array of transformer functions to apply.
 *
 * @returns              Transformed Localizable value.
 *
 * @public
 */
export function transform<T>(value: Localizable<T>, transformers: Transformer<T>[]): Localizable<T>;

/**
 * Transforms a value formatter result using a sequence of transformer functions.
 *
 * @typeParam A - Type of value formatter arguments.
 *
 * @param   formatter    - Value formatter.
 * @param   transformers - Array of transformer functions to apply.
 *
 * @returns              Value formatter with applied transformations.
 *
 * @public
 */
export function transform<A extends unknown[]>(
  formatter: (...args: A) => Localizable,
  transformers: Transformer[],
): (...args: A) => Localizable;

export function transform<T>(
  value: T extends (...args: unknown[]) => Localizable ? T : Localizable<T>,
  transformers: Transformer<T>[] | Transformer[],
): T | Localizable<T> {
  if (typeof value === 'function') {
    // If the value is a function, we assume it's a formatter
    return ((...args: unknown[]) => {
      const result = value(...args);
      return transformers.reduce((acc, transformer) => {
        return (transformer as Transformer)(acc);
      }, result as Localizable);
    }) as T;
  } else {
    return transformers.reduce((acc, transformer) => {
      return (transformer as Transformer<T>)(acc);
    }, value as Localizable<T>);
  }
}
