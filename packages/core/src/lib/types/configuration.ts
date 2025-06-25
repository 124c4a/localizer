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
/**
 * @public
 *
 * A consumer function that accepts a configuration properties.
 *
 * @see {@link ConfigurationProperties}
 */
export type Configurer<V> = (value: Partial<V>) => void;

/**
 * @public
 *
 * Represents a mapped type that extracts configuration properties from a given type `T`.
 *
 * The `ConfigurationProperties` type maps over the keys of `T` and, for each key,
 * determines the type of the value that can be configured if the corresponding property
 * is a `Configuration` type.
 *
 * @template T - The type containing configuration properties.
 *
 * @example
 * ```typescript
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
 * ```
 *
 * @see {@link Configuration}
 */
export type ConfigurationProperties<T> = {
  [K in keyof T]?: T[K] extends Configurer<infer V> ? Partial<V> : never;
};
