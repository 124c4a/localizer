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
 *
 * @see {@link ConfigurationProperties}, {@link configure}
 */
export type Configuration<V> = (value: V) => void;

/**
 * Represents a mapped type that extracts configuration properties from a given type `T`.
 *
 * The `ConfigurationProperties` type maps over the keys of `T` and, for each key,
 * determines the type of the value that can be configured if the corresponding property
 * is a `Configuration` type.
 *
 * @template T - The type containing configuration properties.
 *
 * @example
 * type Configurable = {
 *   name: Configuration<string>;
 *   age: Configuration<number>;
 * };
 * type Properties = ConfigurationProperties<Configurable>;
 * // Properties is equivalent to:
 * // {
 * //   name?: string;
 * //   age?: number;
 * // }
 *
 * @public
 * @see {@link Configuration}, {@link configure}
 */
export type ConfigurationProperties<T> = {
  [K in keyof T]?: T[K] extends Configuration<infer V> ? V : never;
};
