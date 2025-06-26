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
 * @public
 *
 * Default date format configuration.
 *
 * Allows overriding the default date format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @see {@link date}, {@link dateRange}
 */
export const DefaultDateFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultDateFormatOptions, config);
};
/**
 * @public
 *
 * Default time format configuration.
 *
 * Allows overriding the default time format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @see {@link time}
 */
export const DefaultTimeFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultTimeFormatOptions, config);
};
/**
 * @public
 *
 * Default date and time format configuration.
 *
 * Allows overriding the default date and time format options by merging the provided configuration.
 *
 * @param config - Configuration options to override the defaults.
 *
 * @see {@link dateTime}, {@link dateTimeRange}
 */
export const DefaultDateTimeFormat: Configurer<DateTimeFormatOptions> = (
  config,
) => {
  Object.assign(defaultDateTimeFormatOptions, config);
};

/**
 * @public
 *
 * Date formatter instance.
 *
 * Formats dates using the default date format options.
 *
 * @see {@link DefaultDateFormat}, {@link dateRange}, {@link dateTimeRange}
 */
export const date = dateTimeFormatter(defaultDateFormatOptions);
/**
 * @public
 *
 * Time formatter instance.
 *
 * Formats times using the default time format options.
 *
 * @see {@link DefaultTimeFormat}, {@link date}
 */
export const time = dateTimeFormatter(defaultTimeFormatOptions);
/**
 * @public
 *
 * Date-time formatter instance.
 *
 * Formats date-time values using the default date-time format options.
 *
 * @see {@link DefaultDateTimeFormat}, {@link date}, {@link time}, {@link dateRange}, {@link dateTimeRange}
 */
export const dateTime = dateTimeFormatter(defaultDateTimeFormatOptions);

/**
 * @public
 *
 * Date range formatter instance.
 *
 * Formats a range of dates using the default date format options and a generic range separator.
 *
 * @see {@link DefaultDateFormat}, {@link date}, {@link time}, {@link dateTime}
 */
export const dateRange: ValueRangeFormatter<number | Date> = (start, end) =>
  loc`${date(start)}${GenericRangeSeparator}${date(end)}`;
/**
 * @public
 *
 * Date-time range formatter instance.
 *
 * Formats a range of date-time values using the default date-time format options.
 *
 * @see {@link DefaultDateTimeFormat}, {@link date}, {@link time}, {@link dateTime}, {@link dateRange}
 */
export const dateTimeRange = dateTimeRangeFormatter(
  defaultDateTimeFormatOptions,
);
