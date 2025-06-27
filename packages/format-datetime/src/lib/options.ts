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
import { Localizable } from '@localizer/core';
import { Transformer } from '@localizer/transform';

/**
 * @public
 *
 * Options for formatting date and time.
 *
 * This type defines the options that can be used to customize the formatting of date and time
 * using the `Intl.DateTimeFormat` API.
 *
 * @see {@link Intl.DateTimeFormat}
 */
export type DateTimeFormatOptions = {
  /**
   * The locale to use for formatting the date and time.
   * If not provided, the default locale will be used.
   */
  localeMatcher?: 'best fit' | 'lookup';
  /**
   * The format of the weekday.
   */
  weekday?: 'long' | 'short' | 'narrow';
  /**
   * This specifies how the era (e.g., AD, BC) should be displayed in the formatted date.
   */
  era?: 'long' | 'short' | 'narrow';
  /**
   * The format of the year.
   */
  year?: 'numeric' | '2-digit';
  /**
   * The format of the month.
   */
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  /**
   * The format of the day.
   */
  day?: 'numeric' | '2-digit';
  /**
   * The format of the hour.
   */
  hour?: 'numeric' | '2-digit';
  /**
   * The format of the minute.
   */
  minute?: 'numeric' | '2-digit';
  /**
   * The format of the second.
   */
  second?: 'numeric' | '2-digit';
  /**
   * The format of the time zone name.
   */
  timeZoneName?:
    | 'short'
    | 'long'
    | 'shortOffset'
    | 'longOffset'
    | 'shortGeneric'
    | 'longGeneric';
  /**
   * The locale matching algorithm to use.
   */
  formatMatcher?: 'best fit' | 'basic';
  /**
   * Whether to use 12-hour or 24-hour time format.
   * If not provided, the default will be used based on the locale.
   */
  hour12?: boolean;
  /**
   * The time zone to use for formatting the date and time.
   * If not provided, the system's default time zone will be used.
   */
  timeZone?: string;

  /**
   * The calendar to use for formatting the date and time.
   */
  calendar?: string;
  /**
   * The format of the day period (AM/PM).
   */
  dayPeriod?: 'narrow' | 'short' | 'long';
  /**
   * The numbering system to use for formatting the date and time.
   * If not provided, the default numbering system will be used based on the locale.
   */
  numberingSystem?: string;

  /**
   * The style of the date and time formatting.
   * If not provided, the default style will be used based on the locale.
   */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  /**
   * The style of the time formatting.
   * If not provided, the default style will be used based on the locale.
   */
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  /**
   * The hour cycle to use for formatting the date and time.
   * If not provided, the default hour cycle will be used based on the locale.
   */
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';

  /**
   * The number of fractional digits to include in the formatted date and time.
   * If not provided, the default will be used based on the locale.
   */
  fractionalSecondDigits?: 1 | 2 | 3;

  /**
   * An array of transformation functions to apply to the formatted date and time.
   */
  transform?: Transformer<Localizable>[];
  /**
   * An array of parts to include in the formatted date and time.
   * If not provided, all parts will be included.
   */
  parts?: Intl.DateTimeFormatPartTypes[];
};
