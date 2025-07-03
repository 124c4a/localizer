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

/**
 * Options for customizing date and time formatting.
 *
 * Defines configuration options for the `Intl.DateTimeFormat` API.
 *
 * @public
 */
export type DateTimeFormatOptions = {
  /**
   * Locale for formatting. Defaults to the system's locale if not specified.
   *
   * @public
   */
  localeMatcher?: 'best fit' | 'lookup';

  /**
   * Specifies how the weekday should be displayed.
   *
   * @public
   */
  weekday?: 'long' | 'short' | 'narrow';

  /**
   * Controls the display of the era (e.g., AD, BC) in the formatted date.
   *
   * @public
   */
  era?: 'long' | 'short' | 'narrow';

  /**
   * Specifies the year format.
   *
   * @public
   */
  year?: 'numeric' | '2-digit';

  /**
   * Specifies how the month should be displayed.
   *
   * @public
   */
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

  /**
   * Specifies the day format to display.
   *
   * @public
   */
  day?: 'numeric' | '2-digit';

  /**
   * Specifies the hour format.
   *
   * @public
   */
  hour?: 'numeric' | '2-digit';

  /**
   * Format for displaying minutes.
   *
   * @public
   */
  minute?: 'numeric' | '2-digit';

  /**
   * Format for displaying seconds.
   *
   * @public
   */
  second?: 'numeric' | '2-digit';

  /**
   * Specifies how the time zone name should be formatted.
   *
   * @public
   */
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric';

  /**
   * Algorithm for matching the locale.
   *
   * @public
   */
  formatMatcher?: 'best fit' | 'basic';

  /**
   * Use 12-hour or 24-hour time format. Defaults to locale settings if unspecified.
   *
   * @public
   */
  hour12?: boolean;

  /**
   * Time zone for formatting. Defaults to the system's time zone if unspecified.
   *
   * @public
   */
  timeZone?: string;

  /**
   * Calendar system for formatting.
   *
   * @public
   */
  calendar?: string;

  /**
   * Format for displaying the day period (e.g., AM/PM).
   *
   * @public
   */
  dayPeriod?: 'narrow' | 'short' | 'long';

  /**
   * Numbering system for formatting. Defaults to the locale's system if unspecified.
   *
   * @public
   */
  numberingSystem?: string;

  /**
   * Style for formatting date and time. Defaults to locale-based style if unspecified.
   *
   * @public
   */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';

  /**
   * Style for time formatting. Defaults to locale-based style if unspecified.
   *
   * @public
   */
  timeStyle?: 'full' | 'long' | 'medium' | 'short';

  /**
   * Specifies the hour cycle for formatting. Defaults to the locale's hour cycle if unspecified.
   *
   * @public
   */
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';

  /**
   * Number of fractional second digits to include. Defaults to the locale's setting if unspecified.
   *
   * @public
   */
  fractionalSecondDigits?: 1 | 2 | 3;

  /**
   * Specifies which parts to include in the formatted output. If omitted, all parts are included by
   * default.
   *
   * @public
   */
  parts?: (
    | Intl.DateTimeFormatPartTypes
    | `${'startRange' | 'endRange' | 'shared'}-${Intl.DateTimeFormatPartTypes}`
  )[];
};
