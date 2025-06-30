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
import { Transformer } from '@localizer/transform';

/**
 * @public
 *
 * Defines the granularity levels for relative time formatting.
 *
 * Values include:
 * - `year`: Years
 * - `quarter`: Quarters
 * - `month`: Months
 * - `week`: Weeks
 * - `day`: Days
 * - `hour`: Hours
 * - `minute`: Minutes
 * - `second`: Seconds
 */
export type Stop =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

/**
 * @public
 * Configuration options for relative time formatting.
 *
 * @see {@link Intl.RelativeTimeFormat}
 */
export type RelativeTimeFormatOptions = {
  /**
   * @public
   * Specifies the algorithm for locale matching.
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * @public
   * Controls numeric value display: always numeric or auto-adjusted.
   */
  numeric?: 'always' | 'auto';
  /**
   * @public
   * Specifies the length of the localized message.
   */
  style?: 'long' | 'short' | 'narrow';

  /**
   * @public
   * Granularity levels for relative time formatting.
   */
  stops?: Stop[];

  /**
   * @public
   * List of transformers applied to the formatted output.
   */
  transform?: Transformer[];
};
