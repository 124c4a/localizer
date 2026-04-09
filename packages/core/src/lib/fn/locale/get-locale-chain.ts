/*
 * Copyright 2026 Artem Godin.
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
import { parseLocaleCode } from './parse-locale-code.js';

const parentLocaleCache: Partial<Record<LocaleCode, LocaleCode[]>> = {};

/**
 * Retains only distinct locale codes from the provided array.
 *
 * @param   arr - An array of locale codes.
 *
 * @returns     A new array containing only distinct locale codes from the input array.
 *
 * @internal
 */
function distinct(arr: LocaleCode[]): LocaleCode[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

/**
 * Generates a list of locale codes starting with the given locale, followed by its parent locale
 * (if applicable), and fallback locales.
 *
 * Caches results for better performance.
 *
 * @param   locale - The locale code to generate the chain for.
 *
 * @returns        An array of locale codes.
 *
 * @public
 */
export function getLocaleChain(locale: LocaleCode): LocaleCode[] {
  const fallbackLocales = coreOptions.fallbackLocales;
  if (parentLocaleCache[locale]) {
    return parentLocaleCache[locale];
  }

  const [language, country] = parseLocaleCode(locale);
  if (!country) {
    parentLocaleCache[locale] = distinct([locale, ...fallbackLocales]);
  } else {
    parentLocaleCache[locale] = distinct([locale, language, ...fallbackLocales]);
  }
  return parentLocaleCache[locale];
}
