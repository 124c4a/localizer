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
import { CountryCode, LanguageCode, LocaleCode } from '../../consts/locale.js';

/**
 * Parses a locale code into its language and country components.
 *
 * The `parseLocaleCode` function takes a `LocaleCode` string in the format
 * `language-country` (e.g., `en-US`) and splits it into its language and
 * optional country components. The language component is always returned,
 * while the country component is returned if present.
 *
 * @param {LocaleCode} locale - The locale code to parse.
 * @returns {[LanguageCode, CountryCode | undefined]} A tuple containing the language code
 * and the optional country code.
 *
 * @example
 * const [language, country] = parseLocaleCode('en-US');
 * console.log(language); // 'en'
 * console.log(country); // 'US'
 *
 * @example
 * const [language, country] = parseLocaleCode('en');
 * console.log(language); // 'en'
 * console.log(country); // undefined
 *
 * @public
 */
export function parseLocaleCode(
  locale: LocaleCode
): [LanguageCode, CountryCode | undefined] {
  const [language, country] = locale.split('-') as [
    LanguageCode,
    CountryCode | undefined
  ];
  return [language, country];
}
