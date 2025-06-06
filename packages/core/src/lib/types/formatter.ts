import { Localizable } from './localizable.js';

/**
 * A function type that formats a value into a `Localizable` type.
 *
 * The `ValueFormatter` type is used to define functions that take a value of type `T`
 * and return a localized representation of that value.
 *
 * @template T - The type of the value to be formatted.
 *
 * @example
 * const formatValue: ValueFormatter<number> = (value) => ({
 *   localize: (locale) => `Value: ${value} in ${locale}`,
 * });
 * console.log(formatValue(42).localize('en')); // Output: Value: 42 in en
 *
 * @public
 * @see {@link Localizable}
 */
export type ValueFormatter<T> = (value: T) => Localizable;

/**
 * A function type that formats a value and its unit into a `Localizable` type.
 *
 * The `UnitValueFormatter` type is used to define functions that take a value of type `T`
 * and a unit of type `U`, and return a localized representation of the value with its unit.
 *
 * @template T - The type of the value to be formatted.
 * @template U - The type of the unit associated with the value.
 *
 * @example
 * const formatUnitValue: UnitValueFormatter<number, string> = (value, unit) => ({
 *   localize: (locale) => `${value} ${unit} in ${locale}`,
 * });
 * console.log(formatUnitValue(42, 'kg').localize('en')); // Output: 42 kg in en
 *
 * @public
 * @see {@link Localizable}
 */
export type UnitValueFormatter<T, U> = (value: T, unit: U) => Localizable;

/**
 * A function type that formats a range of values into a `Localizable` type.
 *
 * The `ValueRangeFormatter` type is used to define functions that take a start value
 * and an end value of type `T`, and return a localized representation of the range.
 *
 * @template T - The type of the values in the range.
 *
 * @example
 * const formatValueRange: ValueRangeFormatter<number> = (start, end) => ({
 *   localize: (locale) => `Range: ${start} to ${end} in ${locale}`,
 * });
 * console.log(formatValueRange(10, 20).localize('en')); // Output: Range: 10 to 20 in en
 *
 * @public
 * @see {@link Localizable}
 */
export type ValueRangeFormatter<T> = (start: T, end: T) => Localizable;

/**
 * A function type that formats a value relative to a reference value into a `Localizable` type.
 *
 * The `RelativeValueFormatter` type is used to define functions that take a value and a reference
 * value of type `T`, and return a localized representation of the relative value.
 *
 * @template T - The type of the value and reference value.
 *
 * @example
 * const formatRelativeValue: RelativeValueFormatter<number> = (value, reference) => ({
 *   localize: (locale) => `Value: ${value}, Reference: ${reference} in ${locale}`,
 * });
 * console.log(formatRelativeValue(42, 100).localize('en')); // Output: Value: 42, Reference: 100 in en
 *
 * @public
 * @see {@link Localizable}
 */
export type RelativeValueFormatter<T> = (value: T, reference: T) => Localizable;
