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
 * Represents the granularity levels for relative time formatting.
 *
 * Possible values:
 * - `year`: Granularity in years.
 * - `quarter`: Granularity in quarters.
 * - `month`: Granularity in months.
 * - `week`: Granularity in weeks.
 * - `day`: Granularity in days.
 * - `hour`: Granularity in hours.
 * - `minute`: Granularity in minutes.
 * - `second`: Granularity in seconds.
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
 *
 * Options for configuring relative time formatting.
 *
 * @see {@link Intl.RelativeTimeFormat}
 */
export type RelativeTimeFormatOptions = {
  /**
   * The locale matching algorithm to use.
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * Whether to always display numeric values or adjust them automatically.
   */
  numeric?: 'always' | 'auto';
  /**
   * The length of the internationalized message.
   */
  style?: 'long' | 'short' | 'narrow';

  /**
   * An array of granularity levels for relative time formatting.
   */
  stops?: Stop[];

  /**
   * An array of transformer functions to apply to the formatted output.
   */
  transform?: Transformer<Localizable>[];
};
