import { Empty, isLocalizable, Localizable } from '@localizer/core';

import { date } from '../consts/datetime.js';
import { list } from '../consts/list.js';
import { decimal } from '../consts/number.js';
import { stringify } from './stringify.js';

/**
 * Automatically formats a given value into a `Localizable` object based on its type.
 *
 * The function determines the type of the input value and applies the appropriate formatting:
 * - Numbers and bigints are formatted using the `decimal` formatter.
 * - `Number` objects are formatted using their primitive value.
 * - `Date` objects are formatted using the `date` formatter.
 * - Arrays are recursively formatted into a localized list.
 * - Values that implement the `Localizable` interface are returned as-is.
 * - `undefined` values are represented as `Empty`.
 * - All other values are converted to a localized string using the `stringify` function.
 *
 * @param value - The value to be formatted. Can be of any type.
 * @returns A `Localizable` object representing the formatted value.

 * @example
 * const formattedNumber = autoFormat(123);
 * console.log(formattedNumber.localize('en')); // Output: '123'
 *
 * const formattedDate = autoFormat(new Date());
 * console.log(formattedDate.localize('en')); // Output: 'Oct 10, 2023'
 *
 * const formattedList = autoFormat([1, 2, 3]);
 * console.log(formattedList.localize('en')); // Output: '1, 2, and 3'
 *
 * const formattedUndefined = autoFormat(undefined);
 * console.log(formattedUndefined.localize('en')); // Output: ''
 *
 * const formattedString = autoFormat('hello');
 * console.log(formattedString.localize('en')); // Output: 'hello'
 *
 * @public
 * @see {@link Localizable}, {@link decimal}, {@link date}, {@link list}, {@link stringify}
 */
export function autoFormat(value: unknown): Localizable {
  if (['number', 'bigint'].includes(typeof value)) {
    return decimal(value as number | bigint);
  } else if (value instanceof Number) {
    return decimal(value.valueOf());
  } else if (value instanceof Date) {
    return date(value);
  } else if (Array.isArray(value)) {
    return list(value.map((it) => autoFormat(it)));
  } else if (isLocalizable(value)) {
    return value;
  } else if (value === undefined) {
    return Empty;
  } else {
    return stringify(value);
  }
}
