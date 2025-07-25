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
import { loc } from '@localizer/core';
import { decimalFormatter, decimalRangeFormatter } from '@localizer/format-number';
import { apply, transform, Transformer } from '@localizer/transform';

const ignoreUndeterminedLanguage: Transformer = (value) =>
  loc((locale) => (locale === null ? value.localize('en') : value.localize(locale)));

/**
 * Formats the decimal separator with locale-specific settings. Handles undetermined language using
 * a transformation.
 *
 * @public
 */
export const DecimalSeparator = transform(
  decimalFormatter({
    parts: ['decimal'],
  })(1.1),
  [ignoreUndeterminedLanguage],
);

/**
 * Formats the thousand separator with locale settings. Handles undetermined language using a
 * transformation.
 *
 * @public
 */
export const ThousandSeparator = transform(
  decimalFormatter({
    useGrouping: 'always',
    parts: ['group'],
  })(1000),
  [ignoreUndeterminedLanguage],
);

/**
 * Formats a date range with locale-specific settings. Handles undetermined language using a
 * transformation.
 *
 * @public
 */
export const RangeSeparator = transform(
  decimalRangeFormatter({
    parts: ['literal'],
  })(1, 2),
  [ignoreUndeterminedLanguage, apply((str) => `\u2009${str}\u2009`)],
);
