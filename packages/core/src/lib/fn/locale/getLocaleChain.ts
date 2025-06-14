/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
