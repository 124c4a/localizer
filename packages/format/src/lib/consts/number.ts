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
  NumberFormatOptions,
  percentFormatter,
  percentRangeFormatter,
  relativeDecimalFormatter,
  relativePercentFormatter,
  unitFormatter,
} from '@localizer/format-number';

const defaultDecimalFormatOptions: NumberFormatOptions = {};
const defaultPercentFormatOptions: NumberFormatOptions = {};
const defaultCurrencyFormatOptions: NumberFormatOptions = {};
const defaultUnitFormatOptions: NumberFormatOptions = {};

/**
 * @public
 *
 * Decimal formatter instance.
 *
 * Formats numbers as decimals using the default decimal format options.
 */
export const decimal = decimalFormatter(defaultDecimalFormatOptions);
/**
 * @public
 *
 * Decimal range formatter instance.
 *
 * Formats ranges of numbers as decimals using the default decimal format options.
 */
export const decimalRange = decimalRangeFormatter(defaultDecimalFormatOptions);
/**
 * @public
 *
 * Percent formatter instance.
 *
 * Formats numbers as percentages using the default percent format options.
 */
export const percent = percentFormatter(defaultPercentFormatOptions);
/**
 * @public
 *
 * Percent range formatter instance.
 *
 * Formats ranges of numbers as percentages using the default percent format options.
 */
export const percentRange = percentRangeFormatter(defaultPercentFormatOptions);

/**
 * @public
 *
 * Currency formatter instance.
 *
 * Formats numbers as currency values using the default currency format options.
 */
export const currency = currencyFormatter(defaultCurrencyFormatOptions);
/**
 * @public
 *
 * Unit formatter instance.
 *
 * Formats numbers as units using the default unit format options.
 */
export const unit = unitFormatter(defaultUnitFormatOptions);

/**
 * @public
 *
 * Relative decimal formatter instance.
 *
 * Formats numbers as relative decimals using the default decimal format options.
 */
export const relativeDecimal = relativeDecimalFormatter(
  defaultDecimalFormatOptions,
);
/**
 * @public
 *
 * Relative percent formatter instance.
 *
 * Formats numbers as relative percentages using the default percent format options.
 */
export const relativePercent = relativePercentFormatter(
  defaultPercentFormatOptions,
);
