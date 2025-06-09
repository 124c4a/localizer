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
