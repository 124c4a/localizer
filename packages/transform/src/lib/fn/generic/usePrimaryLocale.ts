import { getPrimaryLocale, Localizable, loc } from '@localizer/core';

/**
 * Adjusts the localized value to use the primary locale derived from the given locale.
 *
 * @template T - The type of the value contained within the Localizable object.
 * @param value - A Localizable object containing the value to be transformed.
 * @returns A new Localizable object with the value adjusted to use the primary locale.
 *
 * @example
 * const localizedValue = loc(locale => `Hello ${locale}`);
 * const primaryLocaleValue = usePrimaryLocale(localizedValue);
 * console.log(primaryLocaleValue.localize('sv-FI')); // Output: Hello fi-FI
 *
 * @public
 * @see {@link Localizable}, {@link transform}, {@link getPrimaryLocale}
 */
export function usePrimaryLocale<T>(value: Localizable<T>): Localizable<T> {
  return loc((locale) =>
    value.localize(locale !== null ? getPrimaryLocale(locale) : null)
  );
}
