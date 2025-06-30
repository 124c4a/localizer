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
import { Transformer } from '@localizer/transform';

import { CurrencyCode } from './currency.js';
import { Unit } from './unit.js';

/**
 * @public
 * Options for formatting numbers using `Intl.NumberFormat`.
 * Supports customization for locale, style, currency, unit, grouping,
 * significant digits, rounding, and more.
 *
 * @see {@link Intl.NumberFormat}
 */
export type NumberFormatOptions = {
  /**
   * @public
   * Specifies the locale for formatting. Defaults to the runtime's locale if omitted.
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * @public
   * Defines the formatting style.
   * - 'decimal': Standard decimal numbers.
   * - 'currency': Currency values.
   * - 'percent': Percentages.
   * - 'unit': Numbers with specific units (e.g., meters, kilograms).
   */
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  /**
   * @public
   * ISO 4217 currency code (e.g., 'USD', 'EUR').
   * Required if `style` is 'currency'.
   */
  currency?: CurrencyCode;
  /**
   * @public
   * Specifies how the currency is displayed.
   * - 'symbol': Currency symbol (e.g., '$').
   * - 'narrowSymbol': Narrower currency symbol.
   * - 'code': ISO currency code (e.g., 'USD').
   * - 'name': Full currency name (e.g., 'US Dollar').
   */
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  /**
   * @public
   * Defines the percentage formatting style.
   * - 'standard': Standard percentage format.
   * - 'scientific': Scientific notation.
   * - 'engineering': Engineering notation.
   * - 'compact': Compact representation.
   */
  useGrouping?: 'auto' | 'always' | 'min2' | true | false;
  /**
   * @public
   * Minimum integer digits in the output.
   * Defaults to runtime environment settings.
   */
  minimumIntegerDigits?: number;
  /**
   * @public
   * Minimum fraction digits in the output.
   * Defaults to runtime environment settings.
   */
  minimumFractionDigits?: number;
  /**
   * @public
   * Maximum fraction digits in the output.
   * Defaults to runtime environment settings.
   */
  maximumFractionDigits?: number;
  /**
   * @public
   * Minimum significant digits in the output.
   * Defaults to runtime environment settings.
   */
  minimumSignificantDigits?: number;
  /**
   * @public
   * Maximum significant digits in the output.
   * Defaults to runtime environment settings.
   */
  maximumSignificantDigits?: number;

  /**
   * @public
   * Specifies the numbering system for formatting.
   * Examples: 'latn' (Latin), 'arab' (Arabic).
   */
  numberingSystem?: string;
  /**
   * @public
   * Specifies the compact number format.
   * - 'short': Abbreviated form (e.g., 1K for 1000).
   * - 'long': Full form (e.g., 1 thousand for 1000).
   */
  compactDisplay?: 'short' | 'long';
  /**
   * @public
   * Specifies the number notation.
   * - 'standard': Standard formatting.
   * - 'scientific': Scientific notation.
   * - 'engineering': Engineering notation.
   * - 'compact': Compact representation.
   */
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  /**
   * @public
   * Controls how the sign is displayed.
   * - 'auto': Default behavior.
   * - 'never': No sign.
   * - 'always': Always show the sign.
   * - 'exceptZero': Show sign except for zero.
   * - 'negative': Only for negative values.
   */
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | 'negative';
  /**
   * @public
   * Specifies the unit for formatting when `style` is 'unit'.
   * Example: 'meter', 'kilogram'.
   * Required if `style` is 'unit'.
   */
  unit?: Unit;
  /**
   * @public
   * Specifies how the unit is displayed.
   * - 'short': Abbreviated (e.g., 'm' for meters).
   * - 'long': Full name (e.g., 'meter').
   * - 'narrow': Minimal form.
   */
  unitDisplay?: 'short' | 'long' | 'narrow';
  /**
   * @public
   * Specifies the currency sign format.
   * - 'standard': Standard currency sign.
   * - 'accounting': Accounting currency sign.
   */
  currencySign?: 'standard' | 'accounting';

  /**
   * @public
   * Determines rounding priority.
   * - 'auto': Default behavior.
   * - 'morePrecision': Favors precision.
   * - 'lessPrecision': Favors simplicity.
   */
  roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision';
  /**
   * @public
   * Specifies the rounding increment for formatting.
   * Examples: 1, 2, 5, 10, etc.
   * Defaults to runtime environment settings if omitted.
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
   * @public
   * Specifies the rounding mode for number formatting.
   * Options include:
   * - 'ceil': Round up.
   * - 'floor': Round down.
   * - 'expand': Round away from zero.
   * - 'trunc': Truncate towards zero.
   * - 'halfCeil': Round half up.
   * - 'halfFloor': Round half down.
   * - 'halfExpand': Round half away from zero.
   * - 'halfTrunc': Round half towards zero.
   * - 'halfEven': Round to nearest even number.
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
   * @public
   * Controls the display of trailing zeros.
   * - 'auto': Default behavior.
   * - 'stripIfInteger': Removes zeros for integer values.
   */
  trailingZeroDisplay?: 'auto' | 'stripIfInteger';

  /**
   * @public
   * List of transformers applied to the formatted output.
   */
  transform?: Transformer[];
  /**
   * @public
   * Specifies parts to include in the formatted output.
   * Examples: 'currency', 'group', 'integer', 'literal', 'minusSign',
   * 'nan', 'percentSign', 'plusSign', 'unit'.
   */
  parts?: (
    | Intl.NumberFormatPartTypes
    | `${'startRange' | 'endRange' | 'shared'}-${Intl.NumberFormatPartTypes}`
  )[];
};
