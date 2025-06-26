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
import { Configurer } from '@localizer/core';
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
 * Default configuration options for decimal formatting.
 *
 * These options can be overridden to customize the behavior of the decimal formatter.
 *
 */
export const DefaultDecimalFormat: Configurer<NumberFormatOptions> = (
  config,
) => {
  Object.assign(defaultDecimalFormatOptions, config);
};

/**
 * @public
 *
 * Default configuration options for percent formatting.
 *
 * These options can be overridden to customize the behavior of the percent formatter.
 */
export const DefaultPercentFormat: Configurer<NumberFormatOptions> = (
  config,
) => {
  Object.assign(defaultPercentFormatOptions, config);
};
/**
 * @public
 *
 * Default configuration options for currency formatting.
 *
 * These options can be overridden to customize the behavior of the currency formatter.
 */
export const DefaultCurrencyFormat: Configurer<NumberFormatOptions> = (
  config,
) => {
  Object.assign(defaultCurrencyFormatOptions, config);
};
/**
 * @public
 *
 * Default configuration options for unit formatting.
 *
 * These options can be overridden to customize the behavior of the unit formatter.
 */
export const DefaultUnitFormat: Configurer<NumberFormatOptions> = (config) => {
  Object.assign(defaultUnitFormatOptions, config);
};

/**
 * @public
 *
 * Decimal formatter instance.
 *
 * Formats numbers as decimals using the default decimal format options.
 *
 * @see {@link DefaultDecimalFormat}
 */
export const decimal = decimalFormatter(defaultDecimalFormatOptions);
/**
 * @public
 *
 * Decimal range formatter instance.
 *
 * Formats ranges of numbers as decimals using the default decimal format options.
 *
 * @see {@link DefaultDecimalFormat}
 */
export const decimalRange = decimalRangeFormatter(defaultDecimalFormatOptions);
/**
 * @public
 *
 * Percent formatter instance.
 *
 * Formats numbers as percentages using the default percent format options.
 *
 * @see {@link DefaultPercentFormat}
 */
export const percent = percentFormatter(defaultPercentFormatOptions);
/**
 * @public
 *
 * Percent range formatter instance.
 *
 * Formats ranges of numbers as percentages using the default percent format options.
 *
 * @see {@link DefaultPercentFormat}
 */
export const percentRange = percentRangeFormatter(defaultPercentFormatOptions);

/**
 * @public
 *
 * Currency formatter instance.
 *
 * Formats numbers as currency values using the default currency format options.
 *
 * @see {@link DefaultCurrencyFormat}
 */
export const currency = currencyFormatter(defaultCurrencyFormatOptions);
/**
 * @public
 *
 * Unit formatter instance.
 *
 * Formats numbers as units using the default unit format options.
 *
 * @see {@link DefaultUnitFormat}
 */
export const unit = unitFormatter(defaultUnitFormatOptions);

/**
 * @public
 *
 * Relative decimal formatter instance.
 *
 * Formats numbers as relative decimals using the default decimal format options.
 *
 * @see {@link DefaultDecimalFormat}
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
 *
 * @see {@link DefaultPercentFormat}
 */
export const relativePercent = relativePercentFormatter(
  defaultPercentFormatOptions,
);
