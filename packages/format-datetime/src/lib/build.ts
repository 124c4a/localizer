import { ValueFormatter, ValueRangeFormatter, loc } from '@localizer/core';
import { transform } from '@localizer/transform';

import { DateTimeFormatOptions } from './options.js';

/**
 * Builds a formatter for localized date-time values based on the provided options.
 *
 * @template T - The type of the value to be formatted, either a number (timestamp) or a Date object.
 * @param options - An object specifying the formatting options for date-time values.
 * @returns A ValueFormatter function that formats a single date-time value into a localized string.
 *
 * The formatter uses the `Intl.DateTimeFormat` API to generate localized date-time strings.
 * If the `parts` option is provided, the formatter extracts and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be provided to apply transformations to the formatted result.
 *
 * @example
 * const options = { year: 'numeric', month: 'long', day: 'numeric' };
 * const formatter = buildFormatter(options);
 * const formattedDate = formatter(new Date());
 * console.log(formattedDate.localize('en')); // Output: January 1, 2023
 *
 * @internal
 */
export function buildFormatter<T extends number | Date>(
  options: DateTimeFormatOptions
): ValueFormatter<T> {
  return (value) => {
    const formatter: Record<string, Intl.DateTimeFormat> = {};

    const result = loc((locale) => {
      if (!locale) {
        return '[datetime]';
      }

      formatter[locale] ||= new Intl.DateTimeFormat(locale, options);

      return options.parts !== undefined
        ? formatter[locale]
            .formatToParts(value)
            .filter((part) => options.parts?.includes(part.type))
            .map((part) => part.value)
            .join('')
        : formatter[locale].format(value);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}

/**
 * Builds a formatter for localized date-time ranges based on the provided options.
 *
 * @template T - The type of the values to be formatted, either numbers (timestamps) or Date objects.
 * @param options - An object specifying the formatting options for date-time ranges.
 * @param source - Specifies the source of the range parts to include in the formatted output. Possible values:
 *   - 'startRange': Includes parts from the start of the range.
 *   - 'endRange': Includes parts from the end of the range.
 *   - 'shared': Includes parts shared between the start and end of the range.
 * @returns A ValueRangeFormatter function that formats a date-time range into a localized string.
 *
 * The formatter uses the `Intl.DateTimeFormat` API to generate localized date-time range strings.
 * If the `parts` option is provided, the formatter extracts and joins specific parts of the formatted output.
 * Additionally, a `transform` property can be provided to apply transformations to the formatted result.
 *
 * @example
 * const options = { year: 'numeric', month: 'long', day: 'numeric' };
 * const rangeFormatter = buildRangeFormatter(options);
 * const formattedRange = rangeFormatter(new Date('2023-01-01'), new Date('2023-01-02'));
 * console.log(formattedRange.localize('en')); // Output: January 1 – 2, 2023
 *
 * @internal
 */
export function buildRangeFormatter<T extends number | Date>(
  options: DateTimeFormatOptions,
  source?: 'startRange' | 'endRange' | 'shared'
): ValueRangeFormatter<T> {
  return (start, end) => {
    const formatter: Record<string, Intl.DateTimeFormat> = {};

    const result = loc((locale) => {
      if (!locale) {
        return '[datetimeRange]';
      }

      formatter[locale] ||= new Intl.DateTimeFormat(locale, options);

      return options.parts !== undefined
        ? formatter[locale]
            .formatRangeToParts(start, end)
            .filter(
              (part) =>
                options.parts?.includes(part.type) &&
                (!source || part.source === source)
            )
            .map((part) => part.value)
            .join('')
        : formatter[locale].formatRange(start, end);
    });

    return options.transform ? transform(result, options.transform) : result;
  };
}
