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
 * Applies a series of transformer functions to a Localizable value.
 *
 * @template T - The type of the value contained within the Localizable object.
 * @param value - The initial Localizable value to be transformed.
 * @param transformers - An array of transformer functions applied sequentially to the Localizable value.
 * @returns The transformed Localizable value after all transformers have been applied.
 *
 * @example
 * const initialValue = loc(locale => `heLLO, ${locale}!`);
 * const transformers = [lowerCase, capitalize];
 *
 * const result = transform(initialValue, transformers);
 * console.log(result.localize('en')); // Output: Hello, en!
 *
 * @public
 * @see {@link Localizable}, {@link Transformer}
 */
export function transform<T>(
  value: Localizable<T>,
  transformers: Transformer<Localizable<T>>[]
): Localizable<T> {
  return transformers.reduce((acc, transformer) => {
    return transformer(acc);
  }, value);
}
