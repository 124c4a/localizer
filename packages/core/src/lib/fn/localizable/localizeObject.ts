import { isLocalizable } from './isLocalizable.js';
import { Localized } from '../../types/localizable.js';
import { LocaleCode } from '../../consts/locale.js';

/**
 * Localizes the properties of an object by resolving `Localizable` values to their localized representations.
 *
 * @template T - The type of the input object, where properties can be `Localizable` or other types.
 * @param {T} values - The object containing properties to be localized.
 * @param {LocaleCode | null} locale - The locale code used for localization. If `null`, a default or fallback value may be used.
 * @returns {Localized<T>} - A new object where all `Localizable` properties are replaced with their localized values.
 *
 * @example
 * // Example with an object containing localizable properties
 * const values = {
 *   greeting: loc((locale) => locale === 'en' ? 'Hello' : 'Hola'),
 *   farewell: loc((locale) => locale === 'en' ? 'Goodbye' : 'Adiós'),
 * };
 * const localizedValues = localizeObject(values, 'en');
 * console.log(localizedValues);
 * // Output: { greeting: 'Hello', farewell: 'Goodbye' }
 *
 * @example
 * // Example with mixed properties
 * const values = {
 *   greeting: loc((locale) => locale === 'en' ? 'Hello' : 'Hola'),
 *   age: 25,
 * };
 * const localizedValues = localizeObject(values, 'en');
 * console.log(localizedValues);
 * // Output: { greeting: 'Hello', age: 25 }
 *
 * @public
 * @see {@link Localizable}
 */
export function localizeObject<T extends Record<string, unknown>>(
  values: T,
  locale: LocaleCode | null
): Localized<T> {
  const result: Partial<Record<string, unknown>> = { ...values };
  Object.entries(result).forEach(([key, value]) => {
    if (isLocalizable(value)) {
      result[key] = value.localize(locale);
    }
  });
  return result as Localized<T>;
}
