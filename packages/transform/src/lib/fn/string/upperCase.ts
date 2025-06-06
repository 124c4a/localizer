import { Localizable, loc } from '@localizer/core';

/**
 * Converts the localized value to uppercase for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value converted to uppercase for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `hello ${locale}`);
 * const upperCasedValue = upperCase(localizedValue);
 * console.log(upperCasedValue.localize('en')); // Output: HELLO EN
 *
 * @public
 * @see {@link Localizable}, {@link transform}
 */
export function upperCase(value: Localizable): Localizable {
  return loc((locale) =>
    value
      .localize(locale)
      .toLocaleUpperCase(locale === null ? undefined : locale)
  );
}
