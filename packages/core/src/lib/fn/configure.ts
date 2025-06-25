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
import { Configurer, ConfigurationProperties } from '../types/configuration.js';

/**
 * @public
 *
 * Configures a set of properties using their corresponding configuration functions.
 *
 * The `configure` function iterates over the keys of the provided `arg` object,
 * which contains configuration functions, and applies the values from the `values`
 * object to these functions. If a value exists for a key in `values`, the corresponding
 * configuration function in `arg` is invoked with that value.
 *
 * @typeParam T - A record type where the keys are strings and the values are `Configuration` functions.
 *
 * @param arg - An object containing configuration functions for each property.
 * @param values - An object containing values to be passed to the configuration functions.
 *
 * @see {@link Configurer}, {@link ConfigurationProperties}
 */
export function configure<T extends Record<string, Configurer<object>>>(
  arg: T,
  values: ConfigurationProperties<T>,
) {
  for (const key in arg) {
    if (values[key]) {
      arg[key](values[key]);
    }
  }
}
