import { transform } from '@localizer/transform';
import { ValueFormatter, loc } from '@localizer/core';
import { DisplayNameFormatOptions } from './options.js';

/**
 * Creates a formatter for display names based on the provided options.
 *
 * @template T - The type of the value to be formatted, typically a string.
 * @param options - An object specifying the formatting options for display names.
 * @returns A ValueFormatter function that formats a string value into a localized display name.
 *
 * The formatter uses the `Intl.DisplayNames` API to generate localized display names.
 * If the locale is `null`, a fallback string is returned based on the `type` option.
 * Additionally, a `transform` property can be provided to apply transformations to the formatted display name.
 *
 * @example
 * const options = { type: 'region' };
 * const formatter = displayNameFormatter(options);
 * const formattedName = formatter('US');
 * console.log(formattedName.localize('en')); // Output: United States
 *
 * @public
 * @see {@link ValueFormatter}, {@link DisplayNameFormatOptions}, {@link Intl.DisplayNames}
 */
export function displayNameFormatter<T extends string>(
  options: DisplayNameFormatOptions
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.DisplayNames> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return `[${options.type ?? 'displayName'}]`;
      }

      formatter[locale] ||= new Intl.DisplayNames(locale, options);

      return formatter[locale].of(value) ?? value;
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
