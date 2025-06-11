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
