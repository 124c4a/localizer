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
 *
 * Decimal separator formatter.
 *
 * Formats the decimal separator using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 */
export const DecimalSeparator = decimalFormatter({
  parts: ['decimal'],
  transform: [ignoreUndeterminedLanguage],
})(1.1);

/**
 * @public
 *
 * Thousand separator formatter.
 *
 * Formats the thousand separator using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 */
export const ThousandSeparator = decimalFormatter({
  useGrouping: 'always',
  parts: ['group'],
  transform: [ignoreUndeterminedLanguage],
})(1000);

/**
 * @public
 *
 * Date range separator formatter.
 *
 * Formats a range of dates using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 */
export const DateRangeSeparator = dateTimeRangeFormatter({
  year: 'numeric',
  parts: ['literal'],
  transform: [ignoreUndeterminedLanguage],
})(Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1));

/**
 * @public
 *
 * Generic locale-agnostic range separator.
 *
 * Represents a thin space en dash thin space separator.
 */
export const GenericRangeSeparator = loc`\u2009\u2013\u2009`; // thin space en dash thin space
