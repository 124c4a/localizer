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
import { Configurer } from '../types/configuration.js';

declare global {
  var __LOCALIZER__: Map<string, unknown>;
}

/**
 * Defines a configuration with a unique identifier and an initial configuration object.
 *
 * @typeParam T - The type of the configuration object.
 *
 * @param   id            - Unique identifier for the configuration.
 * @param   initialConfig - Initial configuration object.
 *
 * @returns               A tuple containing the current configuration and a configurer function.
 *
 * @public
 */
export function declareConfiguration<T extends object>(
  id: string,
  initialConfig: T,
): [T, Configurer<T>] {
  globalThis.__LOCALIZER__ ??= new Map<string, unknown>();
  if (!globalThis.__LOCALIZER__.has(id)) {
    // If the configuration with the given id does not exist, initialize it
    globalThis.__LOCALIZER__.set(id, initialConfig);
  }
  return [
    globalThis.__LOCALIZER__.get(id) as T,
    (config: Partial<T>) => {
      Object.assign(globalThis.__LOCALIZER__.get(id) as T, config);
    },
  ];
}
