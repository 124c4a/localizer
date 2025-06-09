import { parseLocaleCode } from './parseLocaleCode.js';
import { LocaleCode, primaryLocales } from '../../consts/locale.js';

/**
 * Retrieves the primary locale for a given country.
 *
 * The `getPrimaryLocale` function determines the primary locale based on the provided
 * `LocaleCode`. If the locale includes a country component, it checks if there is a
 * corresponding primary locale for that country in the `primaryLocales` map. If no
 * country component is present or no primary locale is found, the original locale is returned.
 *
 * @param {LocaleCode} locale - The locale code to process.
 * @returns {LocaleCode} The primary locale associated with the given locale code, or the original locale if no mapping exists.
 *
 * @example
 * const primaryLocale = getPrimaryLocale('sv-FI');
 * console.log(primaryLocale); // 'fi-FI'
 *
 * const primaryLocaleWithoutCountry = getPrimaryLocale('en');
 * console.log(primaryLocaleWithoutCountry); // 'en'
 *
 * @internal
 */
export function getPrimaryLocale(locale: LocaleCode): LocaleCode {
  const [, country] = parseLocaleCode(locale);
  if (!country) {
    return locale;
  } else {
    return primaryLocales[country] ?? locale;
  }
}
