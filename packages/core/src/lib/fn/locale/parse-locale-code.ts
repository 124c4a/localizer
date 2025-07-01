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
 * Splits a `LocaleCode` into language and optional country components.
 *
 * @param   locale - The locale code in `language-country` format (e.g.,
 *   `en-US`).
 *
 * @returns        A tuple with the language code and optional country code.
 *
 * @public
 */
export function parseLocaleCode(
  locale: LocaleCode,
): [LanguageCode, CountryCode | undefined] {
  const [language, country] = locale.split('-') as [
    LanguageCode,
    CountryCode | undefined,
  ];
  return [language, country];
}
