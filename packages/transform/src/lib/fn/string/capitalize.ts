import { Localizable, loc } from '@localizer/core';

/**
 * Capitalizes the first character of the localized value for a given locale.
 *
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the first character of the value capitalized for the specified locale.
 *
 * @example
 * const localizedValue = loc(locale => `hello ${locale}`);
 * const capitalizedValue = capitalize(localizedValue);
 * console.log(capitalizedValue.localize('en')); // Output: Hello en
 *
 * @public
 * @see {@link Localizable}, {@link transform}, {@link upperCase}, {@link lowerCase}
 */
export function capitalize(value: Localizable): Localizable {
  return loc((locale) =>
    value
      .localize(locale)
      .replace(/^\p{CWU}/u, (char) =>
        char.toLocaleUpperCase(locale === null ? undefined : locale)
      )
  );
}
