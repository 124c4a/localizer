import { LocaleCode } from '../../consts/locale.js';
import { Localizable } from '../../types/localizable.js';
import { Localizer } from '../../types/localizer.js';
import { isLocalizable } from '../localizable/isLocalizable.js';

/**
 * Creates a localizer function for a specific locale.
 *
 * The `getLocalizer` function generates a localizer that can be used to localize
 * values or functions returning localizable values based on the provided locale.
 *
 * @param {LocaleCode} locale - The locale code to use for localization.
 * @returns {Localizer} A localizer function bound to the specified locale.
 *
 * @template T - The type of the localized value.
 * @template A - The type of the arguments for functions returning localizable values.
 *
 * @example
 * const localizer = getLocalizer('en');
 * const localizedValue = localizer(loc((locale) => locale === 'en' ? 'Hello' : 'Hola' ));
 * console.log(localizedValue); // Output: Hello
 *
 * @example
 * const localizer = getLocalizer('en');
 * const localizedFunction = localizer((name) =>
 *   loc((locale) => locale === 'en' ? `Hello, ${name}` : `Hola, ${name}`)
 * );
 * console.log(localizedFunction('John')); // Output: Hello, John
 *
 * @public
 * @see {@link Localizer}, {@link Localizable}, {@link LocaleCode}
 */
export function getLocalizer(locale: LocaleCode): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>)
  ): T | ((...args: A) => T) => {
    if (isLocalizable(localizable)) {
      return localizable.localize(locale) as T;
    } else {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(
          locale
        ) as T;
    }
  };

  fn.locale = locale;

  return fn as Localizer;
}
