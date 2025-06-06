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
import { Configuration } from '@localizer/core';

const defaultDecimalFormatOptions: NumberFormatOptions = {};
const defaultPercentFormatOptions: NumberFormatOptions = {};
const defaultCurrencyFormatOptions: NumberFormatOptions = {};
const defaultUnitFormatOptions: NumberFormatOptions = {};

/**
 * Default configuration options for decimal formatting.
 *
 * These options can be overridden to customize the behavior of the decimal formatter.
 *
 * @example
 * configure(
 *   { DefaultDecimalFormat },
 *   { DefaultDecimalFormat: { minimumFractionDigits: 2 } }
 * );
 *
 * @public
 * @see {@link NumberFormatOptions}, {@link configure}
 */
export const DefaultDecimalFormat: Configuration<NumberFormatOptions> = (
  config
) => {
  Object.assign(defaultDecimalFormatOptions, config);
};

/**
 * Default configuration options for percent formatting.
 *
 * These options can be overridden to customize the behavior of the percent formatter.
 *
 * @example
 * configure(
 *   { DefaultPercentFormat },
 *   { DefaultPercentFormat: { minimumFractionDigits: 2 } }
 * );
 *
 * @public
 * @see {@link NumberFormatOptions}, {@link configure}
 */
export const DefaultPercentFormat: Configuration<NumberFormatOptions> = (
  config
) => {
  Object.assign(defaultPercentFormatOptions, config);
};
/**
 * Default configuration options for currency formatting.
 *
 * These options can be overridden to customize the behavior of the currency formatter.
 *
 * @example
 * configure(
 *   { DefaultCurrencyFormat },
 *   { DefaultCurrencyFormat: { minimumFractionDigits: 2 } }
 * );
 *
 * @public
 * @see {@link NumberFormatOptions}, {@link configure}
 */
export const DefaultCurrencyFormat: Configuration<NumberFormatOptions> = (
  config
) => {
  Object.assign(defaultCurrencyFormatOptions, config);
};
/**
 * Default configuration options for unit formatting.
 *
 * These options can be overridden to customize the behavior of the unit formatter.
 *
 * @example
 * configure(
 *   { DefaultUnitFormat },
 *   { DefaultUnitFormat: { minimumFractionDigits: 2 } }
 * );
 *
 * @public
 * @see {@link NumberFormatOptions}, {@link configure}
 */
export const DefaultUnitFormat: Configuration<NumberFormatOptions> = (
  config
) => {
  Object.assign(defaultUnitFormatOptions, config);
};

/**
 * Decimal formatter instance.
 *
 * Formats numbers as decimals using the default decimal format options.
 *
 * @example
 * const formattedDecimal = decimal(1234.56);
 * console.log(formattedDecimal.localize('en'); // 1,234.56
 *
 * @public
 * @see {@link decimalFormatter}, {@link NumberFormatOptions}, {@link DefaultDecimalFormat}
 */
export const decimal = decimalFormatter(defaultDecimalFormatOptions);
/**
 * Decimal range formatter instance.
 *
 * Formats ranges of numbers as decimals using the default decimal format options.
 *
 * @example
 * const formattedRange = decimalRange(1234.56, 7890.12);
 * console.log(formattedRange.localize('en')); // 1,234.56–7,890.12
 *
 * @public
 * @see {@link decimalRangeFormatter}, {@link NumberFormatOptions}, {@link DefaultDecimalFormat}
 */
export const decimalRange = decimalRangeFormatter(defaultDecimalFormatOptions);
/**
 * Percent formatter instance.
 *
 * Formats numbers as percentages using the default percent format options.
 *
 * @example
 * const formattedPercent = percent(0.75);
 * console.log(formattedPercent.localize('en')); // 75%
 *
 * @public
 * @see {@link percentFormatter}, {@link NumberFormatOptions}, {@link DefaultPercentFormat}
 */
export const percent = percentFormatter(defaultPercentFormatOptions);
/**
 * Percent range formatter instance.
 *
 * Formats ranges of numbers as percentages using the default percent format options.
 *
 * @example
 * const formattedRange = percentRange(0.5, 0.75);
 * console.log(formattedRange.localize('en')); // 50–75%
 *
 * @public
 * @see {@link percentRangeFormatter}, {@link NumberFormatOptions}, {@link DefaultPercentFormat}
 */
export const percentRange = percentRangeFormatter(defaultPercentFormatOptions);

/**
 * Currency formatter instance.
 *
 * Formats numbers as currency values using the default currency format options.
 *
 * @example
 * const formattedCurrency = currency(1234.56, 'USD');
 * console.log(formattedCurrency.localize('en')); // $1,234.56
 *
 * @public
 * @see {@link currencyFormatter}, {@link NumberFormatOptions}, {@link DefaultCurrencyFormat}
 */
export const currency = currencyFormatter(defaultCurrencyFormatOptions);
/**
 * Unit formatter instance.
 *
 * Formats numbers as units using the default unit format options.
 *
 * @example
 * const formattedUnit = unit(1234.56, 'kilogram');
 * console.log(formattedUnit.localize('en')); // 1,234.56 kg
 *
 * @public
 * @see {@link unitFormatter}, {@link NumberFormatOptions}, {@link DefaultUnitFormat}
 */
export const unit = unitFormatter(defaultUnitFormatOptions);

/**
 * Relative decimal formatter instance.
 *
 * Formats numbers as relative decimals using the default decimal format options.
 *
 * @example
 * const formattedRelativeDecimal = relativeDecimal(1234.56, 1000);
 * console.log(formattedRelativeDecimal.localize('en')); // +234.56
 *
 * @public
 * @see {@link relativeDecimalFormatter}, {@link NumberFormatOptions}, {@link DefaultDecimalFormat}
 */
export const relativeDecimal = relativeDecimalFormatter(
  defaultDecimalFormatOptions
);
/**
 * Relative percent formatter instance.
 *
 * Formats numbers as relative percentages using the default percent format options.
 *
 * @example
 * const formattedRelativePercent = relativePercent(0.75, 1);
 * console.log(formattedRelativePercent.localize('en')); // -25%
 *
 * @public
 * @see {@link relativePercentFormatter}, {@link NumberFormatOptions}, {@link DefaultPercentFormat}
 */
export const relativePercent = relativePercentFormatter(
  defaultPercentFormatOptions
);
