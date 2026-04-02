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
import { Localizable } from './localizable.js';

/**
 * Formats a value of type `T` into a `Localizable` representation.
 *
 * @typeParam T - The type of the value to format.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export type ValueFormatter<T> = (value: T) => Localizable;

/**
 * Formats a value and its unit into a `Localizable` representation.
 *
 * @typeParam T - Type of the value.
 * @typeParam U - Type of the unit.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export type UnitValueFormatter<T, U> = (value: T, unit: U) => Localizable;

/**
 * Formats a range of values into a `Localizable`.
 *
 * @typeParam T - The type of the range values.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export type ValueRangeFormatter<T> = (start: T, end: T) => Localizable;

/**
 * Formats a value relative to a reference value into a `Localizable`.
 *
 * @typeParam T - The type of the value and reference.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export type RelativeValueFormatter<T> = (reference: T, value: T) => Localizable;
