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
import { Configurer, ConfigurationProperties } from '../types/configuration.js';

/**
 * Configures properties of a single configuration domain.
 *
 * @typeParam T - A function that consumes configuration properties.
 *
 * @param configurer - Consumer function for the configuration properties.
 * @param values     - Configuration values to apply.
 *
 * @public
 *
 * @see {@link Configurer} , {@link ConfigurationProperties}
 */
export function configure<T extends Configurer<object>>(
  configurer: T,
  values: T extends Configurer<infer P> ? Partial<P> : never,
): void;

/**
 * Configures properties using their corresponding functions.
 *
 * Iterates over `arg` keys and applies values from `values` to the corresponding functions in `arg`
 * if a value exists.
 *
 * @typeParam T - A record with string keys and `Configurer` functions as values.
 *
 * @param arg    - Object with configuration functions.
 * @param values - Object with values for the configuration functions.
 *
 * @public
 *
 * @see {@link Configurer} , {@link ConfigurationProperties}
 */
export function configure<T extends Record<string, Configurer<object>>>(
  arg: T,
  values: ConfigurationProperties<T>,
): void;

export function configure<T extends Record<string, Configurer<object>> | Configurer<object>>(
  arg: T,
  values: T extends Configurer<infer P> ? Partial<P> : ConfigurationProperties<T>,
): void {
  if (typeof arg === 'function') {
    // If arg is a function, call it with the values
    arg(values);
  } else {
    for (const key in arg) {
      if ((values as ConfigurationProperties<T>)[key]) {
        (arg as Record<string, Configurer<object>>)[key](
          (values as ConfigurationProperties<T>)[key] as object,
        );
      }
    }
  }
}
