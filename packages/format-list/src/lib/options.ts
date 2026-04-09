/*
 * Copyright 2026 Artem Godin.
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

/**
 * Options for formatting a list of localized values.
 *
 * Supports two modes:
 *
 * - **Intl.ListFormatOptions**: Options for `Intl.ListFormat` API, including locale matching, format,
 *   and length.
 * - **Delimiter-based formatting**: Uses a localized delimiter to join list items.
 *
 * Includes an optional `transform` property for applying transformations.
 *
 * @public
 */
export type ListFormatOptions =
  | {
      /**
       * Locale matching algorithm.
       *
       * @public
       */
      localeMatcher?: 'lookup' | 'best fit';

      /**
       * Output message format.
       *
       * @public
       */
      type?: 'conjunction' | 'disjunction' | 'unit';

      /**
       * Length of the formatted message.
       *
       * @public
       */
      style?: 'long' | 'short' | 'narrow';
    }
  | {
      /**
       * Localized delimiter for joining list items.
       *
       * @public
       */
      delimiter: Localizable;
    };
