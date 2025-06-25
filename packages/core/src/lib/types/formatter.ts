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
import { Localizable } from './localizable.js';

/**
 * @public
 *
 * A function type that formats a value into a `Localizable` type.
 *
 * The `ValueFormatter` type is used to define functions that take a value of type `T`
 * and return a localized representation of that value.
 *
 * @typeParam T - The type of the value to be formatted.
 *
 * @see {@link Localizable}
 */
export type ValueFormatter<T> = (value: T) => Localizable;

/**
 * @public
 *
 * A function type that formats a value and its unit into a `Localizable` type.
 *
 * The `UnitValueFormatter` type is used to define functions that take a value of type `T`
 * and a unit of type `U`, and return a localized representation of the value with its unit.
 *
 * @typeParam T - The type of the value to be formatted.
 * @typeParam U - The type of the unit associated with the value.
 *
 * @see {@link Localizable}
 */
export type UnitValueFormatter<T, U> = (value: T, unit: U) => Localizable;

/**
 * @public
 *
 * A function type that formats a range of values into a `Localizable` type.
 *
 * The `ValueRangeFormatter` type is used to define functions that take a start value
 * and an end value of type `T`, and return a localized representation of the range.
 *
 * @typeParam T - The type of the values in the range.
 *
 * @see {@link Localizable}
 */
export type ValueRangeFormatter<T> = (start: T, end: T) => Localizable;

/**
 * @public
 *
 * A function type that formats a value relative to a reference value into a `Localizable` type.
 *
 * The `RelativeValueFormatter` type is used to define functions that take a value and a reference
 * value of type `T`, and return a localized representation of the relative value.
 *
 * @typeParam T - The type of the value and reference value.
 *
 * @see {@link Localizable}
 */
export type RelativeValueFormatter<T> = (value: T, reference: T) => Localizable;
