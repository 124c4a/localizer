import { RelativeValueFormatter } from '@localizer/core';
import { buildFormatter } from './build.js';
import { RelativeTimeFormatOptions } from './options.js';

/**
 * Creates a relative time formatter function.
 *
 * This function generates a formatter for relative time strings based on the provided options.
 * If no options are specified, it defaults to using `{ numeric: 'auto' }`.
 *
 * @param options - Configuration options for the relative time formatter.
 * @returns A formatter function that formats relative time strings.
 *
 * @example
 * const options = { numeric: 'auto', style: 'long' };
 * const formatter = relativeTimeFormatter(options);
 * const formattedRelativeTime = formatter(new Date(Date.now() - 86400000), new Date());
 * console.log(formattedRelativeTime.localize('en')); // Output: "1 day ago"
 *
 * @public
 * @see {@link RelativeValueFormatter}, {@link RelativeTimeFormatOptions}, {@link Intl.RelativeTimeFormat}
 */
export function relativeTimeFormatter(
  options?: RelativeTimeFormatOptions
): RelativeValueFormatter<Date | number> {
  return buildFormatter(options ?? { numeric: 'auto' });
}
