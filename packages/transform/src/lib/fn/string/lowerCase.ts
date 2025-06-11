import { Localizable, loc } from '@localizer/core';

/**
 * Converts the localized value to lowercase for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value converted to lowercase for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `HELLO ${locale}`);
 * const lowerCasedValue = lowerCase(localizedValue);
 * console.log(lowerCasedValue.localize('en')); // Output: hello en
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export function lowerCase(value: Localizable): Localizable {
  return loc((locale) =>
    value.localize(locale).toLocaleLowerCase(locale ?? undefined)
  );
}
