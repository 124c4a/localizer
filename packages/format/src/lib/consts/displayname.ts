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
import { CountryCode, loc, LocaleCode } from '@localizer/core';
import { displayNameFormatter } from '@localizer/format-displayname';
import { CurrencyCode, currencyCodeFormatter } from '@localizer/format-number';

/**
 * Converts a currency code to its symbol.
 *
 * @param   currency - The currency code to convert.
 *
 * @returns          The currency symbol.
 *
 * @public
 */
export const currencySymbol = currencyCodeFormatter({
  currencyDisplay: 'symbol',
});

/**
 * Formats the name of a currency.
 *
 * @public
 */
export const currencyName = displayNameFormatter<CurrencyCode>('currency');

/**
 * Formats the name of a language.
 *
 * @public
 */
export const languageName = displayNameFormatter<LocaleCode>('language');

/**
 * Formats country names.
 *
 * @public
 */
export const countryName = displayNameFormatter<CountryCode>('region');

/**
 * Formats the name of the current language.
 *
 * @public
 */
export const CurrentLanguage = loc((locale) =>
  locale === null ? '[CurrentLanguage]' : languageName(locale).localize(locale),
);
