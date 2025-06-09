import { getImplicitLocalizer } from '../fn/localizer/getImplicitLocalizer.js';
import { Localizer } from '../types/localizer.js';

/**
 * An implicitly determined `Localizer` instance.
 *
 * The `implicitLocalizer` is a `Localizer` bound to the `activeLocale` set in the configuration.
 * It binds localization functionality to the implicitly determined locale, enabling seamless
 * localization without explicitly specifying the locale.
 *
 * @type {Localizer}
 *
 * @example
 * // Enable implicit localization and set the active locale
 * configure(
 *   { Core },
 *   {
 *     Core: {
 *       implicitLocalization: true,
 *       activeLocale: 'en',
 *     },
 *   }
 * );
 *
 * const localizable = loc((locale) => `Hello, ${locale}!`);
 *
 * // Get the implicit localizer
 * const localizer = implicitLocalizer;
 * console.log(localizer(localizable)); // Output: Hello, en!
 *
 * @public
 * @see {@link Localizer}, {@link Core}
 */
export const implicitLocalizer: Localizer = getImplicitLocalizer();
