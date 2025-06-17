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
import { CountryCode, loc, LocaleCode, ValueFormatter } from '@localizer/core';
import { displayNameFormatter } from '@localizer/format-displayname';
import { CurrencyCode, currencyFormatter } from '@localizer/format-number';

const currencySymbolFormatter = currencyFormatter({
  currencyDisplay: 'symbol',
  parts: ['currency'],
});
/**
 * Formats a currency code into its symbol representation.
 *
 * @param currency - The currency code to format.
 * @returns The formatted currency symbol.
 *
 * @example
 * const symbol = currencySymbol('EUR');
 * console.log(symbol.localize('en')); // Output: "€"
 *
 * @public
 * @see {@link currencyFormatter}
 */
export const currencySymbol: ValueFormatter<CurrencyCode> = (currency) =>
  currencySymbolFormatter(1, currency);

/**
 * Formatter for currency names.
 *
 * This formatter generates the name representation of a currency.
 *
 * @example
 * const formattedName = currencyName('USD').localize('en');
 * console.log(formattedName); // Output: "US Dollar"
 *
 * @public
 * @see {@link displayNameFormatter}
 */
export const currencyName = displayNameFormatter<CurrencyCode>({
  type: 'currency',
});
/**
 * Formatter for language names.
 *
 * This formatter generates the name representation of a language.
 *
 * @example
 * const formattedName = languageName('en').localize('en');
 * console.log(formattedName); // Output: "English"
 *
 * @public
 * @see {@link displayNameFormatter}
 */
export const languageName = displayNameFormatter<LocaleCode>({
  type: 'language',
});
/**
 * Formatter for country names.
 *
 * This formatter generates the name representation of a country.
 *
 * @example
 * const formattedName = countryName('US').localize('en');
 * console.log(formattedName); // Output: "United States"
 *
 * @public
 * @see {@link displayNameFormatter}
 */
export const countryName = displayNameFormatter<CountryCode>({
  type: 'region',
});
/**
 * Format the name of the current language.
 *
 * @example
 * const currentLang = currentLanguage.localize('en');
 * console.log(currentLang); // Output: "English"
 *
 * @public
 * @see {@link languageName}
 */
export const currentLanguage = loc((locale) =>
  locale === null ? '[currentLanguage]' : languageName(locale).localize(locale)
);
