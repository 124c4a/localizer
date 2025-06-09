import { Localizable, loc } from '@localizer/core';
import { dateTimeRangeFormatter } from '@localizer/format-datetime';
import { decimalFormatter } from '@localizer/format-number';
import { Transformer } from '@localizer/transform';

const ignoreUndeterminedLanguage: Transformer<Localizable> = (value) =>
  loc((locale) =>
    locale === null ? value.localize('en') : value.localize(locale)
  );

/**
 * Decimal separator formatter.
 *
 * Formats the decimal separator using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 *
 * @example
 * console.log(DecimalSeparator.localize('en')); // Output: '.'
 *
 * @public
 * @see {@link decimalFormatter}
 */
export const DecimalSeparator = decimalFormatter({
  parts: ['decimal'],
  transform: [ignoreUndeterminedLanguage],
})(1.1);

/**
 * Thousand separator formatter.
 *
 * Formats the thousand separator using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 *
 * @example
 * console.log(ThousandSeparator.localize('en')); // Output: ','
 *
 * @public
 * @see {@link decimalFormatter}
 */
export const ThousandSeparator = decimalFormatter({
  useGrouping: 'always',
  parts: ['group'],
  transform: [ignoreUndeterminedLanguage],
})(1000);

/**
 * Date range separator formatter.
 *
 * Formats a range of dates using locale-specific settings.
 * Applies a transformation to handle undetermined language.
 *
 * @example
 * console.log(DateRangeSeparator.localize('en')); // Output: ' – '
 *
 * @public
 * @see {@link dateTimeRangeFormatter}
 */
export const DateRangeSeparator = dateTimeRangeFormatter({
  year: 'numeric',
  parts: ['literal'],
  transform: [ignoreUndeterminedLanguage],
})(Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1));

/**
 * Generic locale-agnostic range separator.
 *
 * Represents a thin space en dash thin space separator.
 *
 * @example
 * console.log(GenericRangeSeparator.localize('en')); // Output: " – "
 *
 * @public
 */
export const GenericRangeSeparator = loc`\u2009\u2013\u2009`; // thin space en dash thin space
