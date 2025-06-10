import { Localizable } from '../../types/localizable.js';
import { Localizer } from '../../types/localizer.js';
import { isLocalizable } from '../localizable/isLocalizable.js';
import { ensureImplicitLocalization } from './ensureImplicitLocalization.js';

/**
 * Creates an implicit localizer function that automatically determines the locale.
 *
 * The `getImplicitLocalizer` function generates a localizer that uses the locale
 * provided by the `ensureImplicitLocalization` function. It can localize values
 * or functions returning localizable values without explicitly specifying the locale.
 *
 * @returns {Localizer} A localizer function bound to the implicitly determined locale.
 *
 * @template T - The type of the localized value.
 * @template A - The type of the arguments for functions returning localizable values.
 *
 * @internal
 */
export function getImplicitLocalizer(): Localizer {
  const fn = <T, A extends unknown[]>(
    localizable: Localizable<T> | ((...args: A) => Localizable<T>)
  ): T | ((...args: A) => T) => {
    const locale = ensureImplicitLocalization();

    if (isLocalizable(localizable)) {
      return localizable.localize(locale) as T;
    } else {
      return (...args: A) =>
        (localizable as (...args: A) => Localizable<T>)(...args).localize(
          locale
        ) as T;
    }
  };

  Object.defineProperty(fn, 'locale', {
    get: () => ensureImplicitLocalization(),
    enumerable: true,
    configurable: true,
  });

  return fn as Localizer;
}
