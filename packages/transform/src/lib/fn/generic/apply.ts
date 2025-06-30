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

import { Transformer } from '../../types/transform.js';

/**
 * @public
 * Applies a transformation to the localized value of a Localizable object.
 *
 * @typeParam T - The type of the value.
 * @param fn - The transformation function.
 * @returns A transformer that applies the supplied transformation function.
 */
export function apply<T>(fn: (value: T) => T): Transformer<T> {
  return (value: Localizable<T>) => loc((locale) => fn(value.localize(locale)));
}
