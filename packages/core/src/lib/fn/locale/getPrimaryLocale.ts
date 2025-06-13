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
import { LocaleCode, primaryLocales } from '../../consts/locale.js';
import { parseLocaleCode } from './parseLocaleCode.js';

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
