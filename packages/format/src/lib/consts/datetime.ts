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
import { loc, Configurer, ValueRangeFormatter } from '@localizer/core';
import {
  DateTimeFormatOptions,
  dateTimeFormatter,
  dateTimeRangeFormatter,
} from '@localizer/format-datetime';

import { GenericRangeSeparator } from './generic.js';

const defaultDateFormatOptions: DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const defaultTimeFormatOptions: DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const defaultDateTimeFormatOptions: DateTimeFormatOptions = {
  ...defaultDateFormatOptions,
  ...defaultTimeFormatOptions,
};

/**
 * Default date format configuration.
 *
 * Allows overriding the default date format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @example
 * configure(
 *   { DefaultDateFormat },
 *   { day: '2-digit', month: '2-digit', year: '2-digit' }
 * );
 *
 * @public
 * @see {@link DateTimeFormatOptions}, {@link configure}, {@link date}, {@link dateRange}
 */
export const DefaultDateFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultDateFormatOptions, config);
};
/**
 * Default time format configuration.
 *
 * Allows overriding the default time format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @example
 * configure(
 *   { DefaultTimeFormat },
 *   { hour: '2-digit', minute: '2-digit', second: '2-digit' }
 * );
 *
 * @public
 * @see {@link DateTimeFormatOptions}, {@link configure}, {@link time}
 */
export const DefaultTimeFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultTimeFormatOptions, config);
};
/**
 * Default date and time format configuration.
 *
 * Allows overriding the default date and time format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @example
 * configure(
 *   { DefaultDateTimeFormat },
 *   { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
 * );
 *
 * @public
 * @see {@link DateTimeFormatOptions}, {@link configure}, {@link dateTime}, {@link dateTimeRange}
 */
export const DefaultDateTimeFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultDateTimeFormatOptions, config);
};

/**
 * Date formatter instance.
 *
 * Formats dates using the default date format options.
 *
 * @example
 * const formattedDate = date(new Date('2023-10-01'));
 * console.log(formattedDate.localize('en')); // Output: 10/1/2023
 *
 * @public
 * @see {@link dateTimeFormatter}, {@link DefaultDateFormat}, {@link dateRange}, {@link dateTimeRange}
 */
export const date = dateTimeFormatter(defaultDateFormatOptions);
/**
 * Time formatter instance.
 *
 * Formats times using the default time format options.
 *
 * @example
 * const formattedTime = time(new Date('2023-10-01T12:34:56'));
 * console.log(formattedTime.localize('en')); // Output: 12:34:56 PM
 *
 * @public
 * @see {@link dateTimeFormatter}, {@link DefaultTimeFormat}, {@link date}
 */
export const time = dateTimeFormatter(defaultTimeFormatOptions);
/**
 * Date-time formatter instance.
 *
 * Formats date-time values using the default date-time format options.
 *
 * @example
 * const formattedDateTime = dateTime(new Date('2023-10-01T12:34:56'));
 * console.log(formattedDateTime.localize('en')); // Output: 10/1/2023, 12:34:56 PM
 *
 * @public
 * @see {@link dateTimeFormatter}, {@link DefaultDateTimeFormat}, {@link date}, {@link time}, {@link dateRange}, {@link dateTimeRange}
 */
export const dateTime = dateTimeFormatter(defaultDateTimeFormatOptions);

/**
 * Date range formatter instance.
 *
 * Formats a range of dates using the default date format options and a generic range separator.
 *
 * @example
 * const formattedRange = dateRange(new Date(2023, 0, 1), new Date(2023, 11, 31));
 * console.log(formattedRange.localize('en')); // Output: 1/1/2023 – 12/31/2023
 *
 * @public
 * @see {@link dateTimeRangeFormatter}, {@link DefaultDateFormat}, {@link date}, {@link time}, {@link dateTime}
 */
export const dateRange: ValueRangeFormatter<number | Date> = (start, end) =>
  loc`${date(start)}${GenericRangeSeparator}${date(end)}`;
/**
 * Date-time range formatter instance.
 *
 * Formats a range of date-time values using the default date-time format options.
 *
 * @example
 * const formattedRange = dateTimeRange([new Date(2023, 0, 1), new Date(2023, 0, 2)]);
 * console.log(formattedRange.localize('en')); // Output: January 1 – 2, 2023
 *
 * @public
 * @see {@link dateTimeRangeFormatter}, {@link DefaultDateTimeFormat}, {@link date}, {@link time}, {@link dateTime}, {@link dateRange}
 */
export const dateTimeRange = dateTimeRangeFormatter(
  defaultDateTimeFormatOptions,
);
