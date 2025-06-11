import { LocaleCode } from '../../consts/locale.js';
import { coreOptions } from './options.js';

const parentLocaleCache: Partial<Record<LocaleCode, LocaleCode[]>> = {};

/**
 * Generates a chain of locale codes based on the provided locale.
 *
 * The `getLocaleChain` function creates a list of locale codes starting with the
 * given locale, followed by its parent locale (if applicable), and then any fallback
 * locales defined in the `coreOptions`. The result is cached for subsequent calls
 * to improve performance.
 *
 * @param {LocaleCode} locale - The locale code to generate the chain for.
 * @returns {LocaleCode[]} An array of locale codes representing the chain.
 *
 * @example
 * const localeChain = getLocaleChain('sv-FI');
 * console.log(localeChain); // ['sv-FI', 'sv', 'en']
 *
 * const localeChainSingle = getLocaleChain('en');
 * console.log(localeChainSingle); // ['en', 'en']
 *
 * @internal
 * @see {@link CoreOptions}
 */
export function getLocaleChain(locale: LocaleCode): LocaleCode[] {
  const fallbackLocales = coreOptions.fallbackLocales ?? ['en'];
  if (parentLocaleCache[locale]) {
    return parentLocaleCache[locale];
  }

  const parts = locale.split('-');
  if (parts.length < 2) {
    parentLocaleCache[locale] = [locale, ...fallbackLocales];
  } else {
    parentLocaleCache[locale] = [
      locale,
      parts[0],
      ...fallbackLocales,
    ] as LocaleCode[];
  }
  return parentLocaleCache[locale];
}
