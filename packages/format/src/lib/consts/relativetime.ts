import { Configuration } from '@localizer/core';
import {
  RelativeTimeFormatOptions,
  relativeTimeFormatter,
} from '@localizer/format-relativetime';

const defaultRelativeTimeFormatOptions: RelativeTimeFormatOptions = {
  stops: ['year', 'month', 'week', 'day', 'hour', 'minute'],
};

/**
 * Default relative time format configuration.
 *
 * This function allows overriding the default relative time format options
 * by merging the provided configuration with the existing defaults.
 *
 * @param config - An object containing the configuration options to override the defaults.
 *
 * @example
 * configure(
 *   { DefaultRelativeTimeFormat },
 *   { DefaultRelativeTimeFormat: { stops: ['year', 'month', 'day'] } }
 * );
 *
 * @public
 * @see {@link RelativeTimeFormatOptions}, {@link configure}
 */
export const DefaultRelativeTimeFormat: Configuration<
  RelativeTimeFormatOptions
> = (config) => {
  Object.assign(defaultRelativeTimeFormatOptions, config);
};

/**
 * Relative time formatter instance.
 *
 * This instance is created using the default relative time format options
 * and can be used to format relative time strings.
 *
 * @example
 * const formattedTime = relativeTime(new Date('2023-01-01'), new Date('2022-12-31'));
 * console.log(formattedTime.localize('en')); // Output: "1 day ago"
 *
 * @public
 * @see {@link RelativeTimeFormatOptions}, {@link relativeTimeFormatter}, {@link DefaultRelativeTimeFormat}
 */
export const relativeTime = relativeTimeFormatter(
  defaultRelativeTimeFormatOptions
);
