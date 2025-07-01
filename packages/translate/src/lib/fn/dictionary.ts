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
import { Localizable, ValueFormatter } from '@localizer/core';

import { translate, TranslationMap } from './translate.js';

/**
 * Creates a dictionary of localized values or value formatters.
 *
 * This function takes a dictionary object (`dict`) where each key maps to
 * either a static translation map or a function that generates a dynamic
 * translation map. It returns a new dictionary where each key maps to either a
 * `Localizable` value or a `ValueFormatter`, depending on the type of the input
 * value.
 *
 * @typeParam T - The type of the input dictionary.
 *
 * @param   dict - The input dictionary containing static or dynamic translation
 *   maps.
 *
 * @returns      A dictionary where each key maps to a localized value or a
 *   value formatter.
 *
 * @alpha
 */
export function dictionary<T>(dict: T): {
  readonly [P in keyof T]: T[P] extends (value: infer V) => TranslationMap
    ? ValueFormatter<V>
    : Localizable;
} {
  const result: Record<string, unknown> = {};

  for (const key in dict) {
    result[key] = translate(dict[key] as TranslationMap, key);
  }

  return result as {
    readonly [P in keyof T]: T[P] extends (value: infer V) => TranslationMap
      ? ValueFormatter<V>
      : Localizable;
  };
}
