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
 * Defines the granularity levels for relative time formatting.
 *
 * Values include:
 *
 * - `year`: Years
 * - `quarter`: Quarters
 * - `month`: Months
 * - `week`: Weeks
 * - `day`: Days
 * - `hour`: Hours
 * - `minute`: Minutes
 * - `second`: Seconds
 *
 * @public
 */
export type Stop = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

/**
 * Configuration options for relative time formatting.
 *
 * @public
 */
export type RelativeTimeFormatOptions = {
  /**
   * Specifies the algorithm for locale matching.
   *
   * @public
   */
  localeMatcher?: 'lookup' | 'best fit';

  /**
   * Controls numeric value display: always numeric or auto-adjusted.
   *
   * @public
   */
  numeric?: 'always' | 'auto';

  /**
   * Specifies the length of the localized message.
   *
   * @public
   */
  style?: 'long' | 'short' | 'narrow';

  /**
   * Granularity levels for relative time formatting.
   *
   * @public
   */
  stops?: Stop[];

  /**
   * List of transformers applied to the formatted output.
   *
   * @public
   */
  transform?: Transformer[];
};
