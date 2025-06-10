import { LocaleCode } from '../../consts/locale.js';
import { coreOptions } from '../locale/options.js';

/**
 * Ensures that implicit localization is enabled and an active locale is set.
 *
 * The `ensureImplicitLocalization` function checks whether implicit localization
 * is enabled in the `coreOptions` and verifies that an active locale is defined.
 * If these conditions are not met, it throws an error. Otherwise, it returns the
 * active locale.
 *
 * @throws {RangeError} Throws an error if implicit localization is disabled or
 * if no active locale is set.
 *
 * @returns {LocaleCode} The active locale code.
 *
 * @example
 * // Assuming `coreOptions` is properly configured:
 * const locale = ensureImplicitLocalization();
 * console.log(locale); // Outputs the active locale code.
 *
 * @internal
 */
export function ensureImplicitLocalization(): LocaleCode {
  if (
    !coreOptions.implicitLocalization ||
    coreOptions.activeLocale === undefined
  ) {
    throw new RangeError(
      'Implicit localization requires an active locale to be set.'
    );
  } else {
    return coreOptions.activeLocale;
  }
}
