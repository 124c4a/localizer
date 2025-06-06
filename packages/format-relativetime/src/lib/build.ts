import { loc, RelativeValueFormatter } from '@localizer/core';
import { computeRelativeTime } from './computeRelativeTime.js';
import { transform } from '@localizer/transform';
import { RelativeTimeFormatOptions } from './options.js';

/**
 * Builds a formatter for localized relative time values based on the provided options.
 *
 * @template T - The type of the value to be formatted, either a number (timestamp) or a Date object.
 * @param options - An object specifying the formatting options for relative time values.
 * @returns A RelativeValueFormatter function that formats a relative time value into a localized string.
 *
 * The formatter uses the `Intl.RelativeTimeFormat` API to generate localized relative time strings.
 * It calculates the relative time between a reference point and the given value using the `computeRelativeTime` utility.
 * The `stops` option determines the granularity of the relative time (e.g., year, month, day, etc.).
 * Additionally, a `transform` property can be provided to apply transformations to the formatted result.
 *
 * @example
 * const options = { numeric: 'auto', style: 'long' };
 * const formatter = buildFormatter(options);
 * const formattedRelativeTime = formatter(new Date(), new Date(Date.now() - 86400000));
 * console.log(formattedRelativeTime.localize('en')); // Output: 1 day ago
 *
 * @public
 * @see {@link RelativeValueFormatter}, @see {@link RelativeTimeFormatOptions}, {@link Intl.RelativeTimeFormat}
 */
export function buildFormatter<T extends number | Date>(
  options: RelativeTimeFormatOptions
): RelativeValueFormatter<T> {
  return (reference, value) => {
    const formatter: Record<string, Intl.RelativeTimeFormat> = {};

    const result = loc((locale) => {
      if (locale === null) {
        return '[relativeTime]';
      }

      formatter[locale] ||= new Intl.RelativeTimeFormat(locale, options);

      const relativeTime = computeRelativeTime(
        value,
        reference,
        options.stops ?? ['year', 'month', 'week', 'day', 'hour', 'minute']
      );
      return formatter[locale].format(relativeTime.value, relativeTime.stop);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
