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
import { Localizable, loc } from '@localizer/core';
import { dateTimeRangeFormatter } from '@localizer/format-datetime';
import { decimalFormatter } from '@localizer/format-number';
import { Transformer } from '@localizer/transform';

const ignoreUndeterminedLanguage: Transformer<Localizable> = (value) =>
  loc((locale) =>
    locale === null ? value.localize('en') : value.localize(locale),
  );

/**
 * @public
 * Formats the decimal separator with locale-specific settings.
 * Handles undetermined language using a transformation.
 */
export const DecimalSeparator = decimalFormatter({
  parts: ['decimal'],
  transform: [ignoreUndeterminedLanguage],
})(1.1);

/**
 * @public
 * Formats the thousand separator with locale settings.
 * Handles undetermined language using a transformation.
 */
export const ThousandSeparator = decimalFormatter({
  useGrouping: 'always',
  parts: ['group'],
  transform: [ignoreUndeterminedLanguage],
})(1000);

/**
 * @public
 * Formats a date range with locale-specific settings.
 * Handles undetermined language using a transformation.
 */
export const DateRangeSeparator = dateTimeRangeFormatter({
  year: 'numeric',
  parts: ['literal'],
  transform: [ignoreUndeterminedLanguage],
})(Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1));

/**
 * @public
 * A locale-agnostic range separator using a thin space, en dash, and thin space.
 */
export const GenericRangeSeparator = loc`\u2009\u2013\u2009`; // thin space en dash thin space
