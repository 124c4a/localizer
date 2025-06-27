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
 * Options for formatting display names with `Intl.DisplayNames`.
 *
 * @see {@link Intl.DisplayNames}
 */
export type DisplayNameFormatOptions = {
  /**
   * Determines the locale matching algorithm.
   * Options: 'lookup' or 'best fit'.
   *
   * @public
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * Defines the display name style.
   * Options: 'long', 'short', or 'narrow'.
   *
   * @public
   */
  style?: 'long' | 'short' | 'narrow';
  /**
   * @public
   * Specifies the type of display name to format.
   * - 'language': Language names.
   * - 'region': Region names.
   * - 'script': Script names.
   * - 'calendar': Calendar names.
   * - 'dateTimeField': Date-time field names.
   * - 'currency': Currency names.
   */
  type?:
    | 'language'
    | 'region'
    | 'script'
    | 'calendar'
    | 'dateTimeField'
    | 'currency';
  /**
   * @public
   * Controls the display format for language names.
   */
  languageDisplay?: 'dialect' | 'standard';
  /**
   * @public
   * Fallback behavior if a display name cannot be generated.
   * Options: 'code' or 'none'.
   */
  fallback?: 'code' | 'none';

  /**
   * @public
   * A list of functions to transform the formatted display name.
   * Each function processes a Localizable and returns a modified Localizable.
   */
  transform?: Transformer<Localizable>[];
};
