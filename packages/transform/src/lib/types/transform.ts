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

/**
 * A type alias for a Transformer function.
 *
 * A Transformer is a function that takes a value of type `T` (which must extend
 * the `Localizable<unknown>` interface) and returns a transformed value of the same type.
 *
 * @template T - A type that extends `Localizable<unknown>`.
 *
 * @example
 * const exampleTransformer: Transformer<MyLocalizableType> = (value) => {
 *   // Perform transformation logic here
 *   return value;
 * };
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export type Transformer<T extends Localizable<unknown>> = (value: T) => T;
