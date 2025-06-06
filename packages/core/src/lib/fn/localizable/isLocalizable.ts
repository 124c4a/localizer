import { Localizable } from '../../types/localizable.js';

/**
 * Determines whether a given value implements the `Localizable` interface.
 *
 * @param {unknown} x - The value to check.
 * @returns {x is Localizable} `true` if the value implements the `Localizable` interface, otherwise `false`.
 *
 * @example
 * const localizableValue = loc((locale) => `Hello, ${locale}`);
 * console.log(isLocalizable(localizableValue)); // true
 *
 * const nonLocalizableValue = 'string value';
 * console.log(isLocalizable(nonLocalizableValue)); // false
 *
 * @public
 * @see {@link Localizable}
 */
export function isLocalizable(x: unknown): x is Localizable {
  return (
    typeof x === 'object' &&
    x !== null &&
    'localize' in x &&
    typeof (x as Localizable).localize === 'function'
  );
}
