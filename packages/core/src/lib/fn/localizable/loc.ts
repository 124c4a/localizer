import { Localizable } from '../../types/localizable.js';
import { LocalizableValue } from './LocalizableValue.js';
import { UnlocalizableValue } from './UnlocalizableValue.js';
import { localizeArray } from './localizeArray.js';
import { LocaleCode } from '../../consts/locale.js';

/**
 * Creates a `Localizable` instance based on the provided localization function.
 *
 * @template T - The type of the localized value.
 *
 * @param {(locale: LocaleCode | null) => T} localize - A function that takes a locale code and returns a localized value.
 * @returns {Localizable<T>} A `Localizable` instance representing the localized value.
 *
 * @example
 * // Using a localization function
 * const localizedValue = loc((locale) => locale === 'en' ? 'Hello' : 'Hola');
 * console.log(localizedValue.localize('en')); // 'Hello'
 *
 * @public
 * @see {@link Localizable}, {@link Localizer}
 */
export function loc<T = string>(
  localize: (locale: LocaleCode | null) => T
): Localizable<T>;
/**
 * Creates a `Localizable` instance based on the provided localization template strings.
 *
 * @param {TemplateStringsArray} strings - Template strings.
 * @param {...Localizable[]} expr - The expressions to interpolate into the template strings.
 * @returns {Localizable} A `Localizable` instance representing the localized value.
 *
 * @example
 * // Using template strings
 * const name = loc`John`;
 * const greeting = loc`Hello, ${name}!`;
 * console.log(greeting.localize('en')); // 'Hello, John!'
 *
 * @public
 * @see {@link Localizable}, {@link Localizer}
 */
export function loc(
  strings: TemplateStringsArray,
  ...expr: Localizable[]
): Localizable;
/**
 * @internal
 */
export function loc<T = string>(
  stringsOrLocalize: TemplateStringsArray | ((locale: LocaleCode | null) => T),
  ...expr: Localizable[]
): Localizable<T> {
  if (stringsOrLocalize instanceof Function) {
    return new LocalizableValue<T>(stringsOrLocalize);
  } else if (expr.length === 0) {
    return new UnlocalizableValue(stringsOrLocalize[0] as T) as Localizable<T>;
  } else {
    return new LocalizableValue((locale) =>
      String.raw({ raw: stringsOrLocalize }, ...localizeArray(expr, locale))
    ) as unknown as Localizable<T>;
  }
}
