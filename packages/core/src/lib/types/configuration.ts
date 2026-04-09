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

/**
 * A function that consumes configuration properties.
 *
 * @public
 *
 * @see {@link ConfigurationProperties}
 */
export type Configurer<V> = (value: Partial<V>) => void;

/**
 * Maps a type `T` to its configuration properties. For each key in `T`, extracts the configurable
 * value type if the property is a `Configurer`.
 *
 * @typeParam T - The type to extract configuration properties from.
 *
 * @public
 *
 * @see {@link Configurer}
 */
export type ConfigurationProperties<T> = {
  [K in keyof T]?: T[K] extends Configurer<infer V> ? Partial<V> : never;
};
