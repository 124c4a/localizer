import { Localizable, loc } from '@localizer/core';

/**
 * Converts an unknown value into a `Localizable` object.
 *
 * This function is useful for converting various types of values (like numbers, strings, objects, etc.)
 * into a format that can be localized. The resulting `Localizable` object can be used in templates
 * or components that require localization support.
 *
 * @param value - The value to be converted. Can be of any type.
 * @returns A `Localizable` object that, when localized, returns the string representation of the value.
 * If the locale is `null`, it returns the placeholder string '[stringify]'.
 *
 * @example
 * const localizedValue = stringify(123);
 * console.log(localizedValue.localize('en')); // Output: '123'
 *
 * @public
 * @see {@link Localizable}, {@link loc}
 */
export function stringify(value: unknown): Localizable {
  return loc((locale) => (locale === null ? '[stringify]' : String(value)));
}
