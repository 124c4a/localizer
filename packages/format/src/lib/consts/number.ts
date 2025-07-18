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
import {
  currencyFormatter,
  decimalFormatter,
  decimalRangeFormatter,
  percentFormatter,
  percentRangeFormatter,
  relativeDecimalFormatter,
  relativePercentFormatter,
  unitFormatter,
} from '@localizer/format-number';

/**
 * Formats numbers as decimals with default options.
 *
 * @public
 */
export const decimal = decimalFormatter({});

/**
 * Formats number ranges as decimals with default options.
 *
 * @public
 */
export const decimalRange = decimalRangeFormatter({});

/**
 * Formats numbers as percentages with default options.
 *
 * @public
 */
export const percent = percentFormatter({});

/**
 * Formats number ranges as percentages with default options.
 *
 * @public
 */
export const percentRange = percentRangeFormatter({});

/**
 * Formats numbers as currency using default options.
 *
 * @public
 */
export const currency = currencyFormatter({});

/**
 * Formats numbers as units with default options.
 *
 * @public
 */
export const unit = unitFormatter({});

/**
 * Formats numbers as relative decimals with default options.
 *
 * @public
 */
export const relativeDecimal = relativeDecimalFormatter({});

/**
 * Formats numbers as relative percentages with default options.
 *
 * @public
 */
export const relativePercent = relativePercentFormatter({});
