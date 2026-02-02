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
import { LocaleCode, primaryLocales } from '../../consts/locale.js';
import { parseLocaleCode } from './parse-locale-code.js';

/**
 * Returns the primary locale for a given locale code.
 *
 * If the locale includes a country, it maps to the primary locale for that country using
 * `primaryLocales`. Otherwise, the original locale is returned.
 *
 * @param   locale - The locale code to process.
 *
 * @returns        The primary locale or the original locale if no mapping exists.
 *
 * @public
 */
export function getPrimaryLocale(locale: LocaleCode): LocaleCode {
  const [, country] = parseLocaleCode(locale);
  if (!country) {
    return locale;
  } else {
    return primaryLocales[country] as LocaleCode;
  }
}
