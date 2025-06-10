import { Localizable } from '@localizer/core';

import { Transformer } from '../types/transform.js';

/**
 * Applies a series of transformer functions to a Localizable value.
 *
 * @template T - The type of the value contained within the Localizable object.
 * @param value - The initial Localizable value to be transformed.
 * @param transformers - An array of transformer functions applied sequentially to the Localizable value.
 * @returns The transformed Localizable value after all transformers have been applied.
 *
 * @example
 * const initialValue = loc(locale => `heLLO, ${locale}!`);
 * const transformers = [lowerCase, capitalize];
 *
 * const result = transform(initialValue, transformers);
 * console.log(result.localize('en')); // Output: Hello, en!
 *
 * @public
 * @see {@link Localizable}, {@link Transformer}
 */
export function transform<T>(
  value: Localizable<T>,
  transformers: Transformer<Localizable<T>>[]
): Localizable<T> {
  return transformers.reduce((acc, transformer) => {
    return transformer(acc);
  }, value);
}
