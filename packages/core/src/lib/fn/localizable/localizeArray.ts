import { LocaleCode } from '../../consts/locale.js';
import { Localized } from '../../types/localizable.js';
import { isLocalizable } from './isLocalizable.js';

/**
 * Localizes an array of values based on the provided locale.
 *
 * @template T - The type of the array elements.
 * @param {T} values - The array of values to be localized.
 * @param {LocaleCode | null} locale - The locale code to use for localization, or `null` for no localization.
 * @returns {Localized<T>} - A localized version of the input array.
 *
 * @example
 * const values = [loc((locale) => `Localized: ${locale}`), "plain text"];
 * const localizedValues = localizeArray(values, "en-US");
 * console.log(localizedValues); // ["Localized: en-US", "plain text"]
 *
 * @public
 * @see {@link Localizable}
 */
export function localizeArray<T extends unknown[]>(
  values: T,
  locale: LocaleCode | null
): Localized<T> {
  return values.map((value) =>
    isLocalizable(value) ? value.localize(locale) : value
  ) as Localized<T>;
}
