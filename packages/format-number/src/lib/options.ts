import { Localizable } from '@localizer/core';
import { Transformer } from '@localizer/transform';

import { CurrencyCode } from './currency.js';
import { Unit } from './unit.js';

/**
 * Represents the options for formatting numbers using the `Intl.NumberFormat` API.
 * This type defines various properties that can be used to customize the formatting of numbers,
 * including locale, style, currency, unit, and other formatting options.
 *
 * This type is designed to be used with the `Intl.NumberFormat` API to create localized number formats
 * that can handle different styles such as decimal, currency, percent, and unit formatting.
 * It allows for extensive customization of how numbers are displayed, including options for
 * grouping, significant digits, rounding, and more.
 *
 * @public
 * @see {@link Intl.NumberFormat}
 */
export type NumberFormatOptions = {
  /**
   * The locale to use for formatting. If not provided, the default locale of the runtime environment will be used.
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * The formatting style to use. Can be 'decimal', 'currency', 'percent', or 'unit'.
   * - 'decimal': Formats numbers as standard decimal values.
   * - 'currency': Formats numbers as currency values.
   * - 'percent': Formats numbers as percentages.
   * - 'unit': Formats numbers with a specific unit (e.g., meters, kilograms).
   */
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  /**
   * The currency code to use when formatting as currency. This should be a valid ISO 4217 currency code (e.g., 'USD', 'EUR').
   * Required if `style` is set to 'currency'.
   */
  currency?: CurrencyCode;
  /**
   * The display format for the currency. Can be 'symbol', 'narrowSymbol', 'code', or 'name'.
   * - 'symbol': Uses the currency symbol (e.g., '$').
   * - 'narrowSymbol': Uses a narrower version of the currency symbol.
   * - 'code': Uses the ISO currency code (e.g., 'USD').
   * - 'name': Uses the full name of the currency (e.g., 'US Dollar').
   */
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  /**
   * The formatting style for percentages. Can be 'standard', 'scientific', 'engineering', or 'compact'.
   * - 'standard': Formats percentages in a standard way.
   * - 'scientific': Formats percentages in scientific notation.
   * - 'engineering': Formats percentages in engineering notation.
   * - 'compact': Formats percentages in a compact form.
   */
  useGrouping?: 'auto' | 'always' | 'min2' | true | false;
  /**
   * The minimum number of integer digits to use in the formatted output.
   * If not specified, the default is determined by the runtime environment.
   */
  minimumIntegerDigits?: number;
  /**
   * The minimum number of fraction digits to use in the formatted output.
   * If not specified, the default is determined by the runtime environment.
   */
  minimumFractionDigits?: number;
  /**
   * The maximum number of fraction digits to use in the formatted output.
   * If not specified, the default is determined by the runtime environment.
   */
  maximumFractionDigits?: number;
  /**
   * The minimum number of significant digits to use in the formatted output.
   * If not specified, the default is determined by the runtime environment.
   */
  minimumSignificantDigits?: number;
  /**
   * The maximum number of significant digits to use in the formatted output.
   * If not specified, the default is determined by the runtime environment.
   */
  maximumSignificantDigits?: number;

  /**
   * The numbering system to use for formatting. This can be a specific numbering system like 'latn' (Latin), 'arab' (Arabic), etc.
   */
  numberingSystem?: string;
  /**
   * The compact display format to use. Can be 'short' or 'long'.
   * - 'short': Uses a short form for compact numbers (e.g., 1K for 1000).
   * - 'long': Uses a long form for compact numbers (e.g., 1 thousand for 1000).
   */
  compactDisplay?: 'short' | 'long';
  /**
   * The notation to use for formatting numbers. Can be 'standard', 'scientific', 'engineering', or 'compact'.
   * - 'standard': Formats numbers in a standard way.
   * - 'scientific': Formats numbers in scientific notation.
   * - 'engineering': Formats numbers in engineering notation.
   * - 'compact': Formats numbers in a compact form.
   */
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  /**
   * The sign display format to use. Can be 'auto', 'never', 'always', 'exceptZero', or 'negative'.
   * - 'auto': Automatically determines when to show the sign.
   * - 'never': Never shows the sign.
   * - 'always': Always shows the sign.
   * - 'exceptZero': Shows the sign except for zero values.
   * - 'negative': Only shows the sign for negative values.
   */
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | 'negative';
  /**
   * The unit to use when formatting as a unit. This should be a valid unit string (e.g., 'meter', 'kilogram').
   * Required if `style` is set to 'unit'.
   */
  unit?: Unit;
  /**
   * The display format for the unit. Can be 'short', 'long', or 'narrow'.
   * - 'short': Uses a short form for the unit (e.g., m for meters).
   * - 'long': Uses a long form for the unit (e.g., meter for meters).
   * - 'narrow': Uses a narrow form for the unit.
   */
  unitDisplay?: 'short' | 'long' | 'narrow';
  /**
   * The currency sign to use when formatting as a currency. Can be 'standard' or 'accounting'.
   * - 'standard': Uses the standard currency sign.
   * - 'accounting': Uses the accounting currency sign.
   */
  currencySign?: 'standard' | 'accounting';

  /**
   * The rounding priority to use when formatting numbers. Can be 'auto', 'morePrecision', or 'lessPrecision'.
   * - 'auto': Automatically determines the rounding priority.
   * - 'morePrecision': Prioritizes more precision in rounding.
   * - 'lessPrecision': Prioritizes less precision in rounding.
   */
  roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision';
  /**
   * The rounding increment to use when formatting numbers. This can be a specific value like 1, 2, 5, etc.
   * If not specified, the default is determined by the runtime environment.
   */
  roundingIncrement?:
    | 1
    | 2
    | 5
    | 10
    | 20
    | 25
    | 50
    | 100
    | 200
    | 250
    | 500
    | 1000
    | 2000
    | 2500
    | 5000;
  /**
   * The rounding mode to use when formatting numbers. Can be 'ceil', 'floor', 'expand', 'trunc', 'halfCeil', 'halfFloor', 'halfExpand', 'halfTrunc', or 'halfEven'.
   */
  roundingMode?:
    | 'ceil'
    | 'floor'
    | 'expand'
    | 'trunc'
    | 'halfCeil'
    | 'halfFloor'
    | 'halfExpand'
    | 'halfTrunc'
    | 'halfEven';
  /**
   * The display format for trailing zeros in the formatted output. Can be 'auto' or 'stripIfInteger'.
   */
  trailingZeroDisplay?: 'auto' | 'stripIfInteger';

  /**
   * An array of transformers to apply to the formatted output.
   */
  transform?: Transformer<Localizable>[];
  /**
   * An array of parts to include in the formatted output.
   * This can be used to specify which parts of the formatted number should be included,
   * such as 'currency', 'group', 'integer', 'literal', 'minusSign', 'nan', 'percentSign',
   * 'plusSign', 'unit', etc.
   */
  parts?: Intl.NumberFormatPartTypes[];
};
