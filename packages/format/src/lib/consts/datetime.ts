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
import { loc, ValueRangeFormatter } from '@localizer/core';
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
 * Date formatter instance.
 *
 * Formats dates using the default date format options.
 */
export const date = dateTimeFormatter(defaultDateFormatOptions);
/**
 * @public
 *
 * Time formatter instance.
 *
 * Formats times using the default time format options.
 */
export const time = dateTimeFormatter(defaultTimeFormatOptions);
/**
 * @public
 *
 * Date-time formatter instance.
 *
 * Formats date-time values using the default date-time format options.
 */
export const dateTime = dateTimeFormatter(defaultDateTimeFormatOptions);

/**
 * @public
 *
 * Date range formatter instance.
 *
 * Formats a range of dates using the default date format options and a generic range separator.
 */
export const dateRange: ValueRangeFormatter<number | Date> = (start, end) =>
  loc`${date(start)}${GenericRangeSeparator}${date(end)}`;
/**
 * @public
 *
 * Date-time range formatter instance.
 *
 * Formats a range of date-time values using the default date-time format options.
 */
export const dateTimeRange = dateTimeRangeFormatter(
  defaultDateTimeFormatOptions,
);
