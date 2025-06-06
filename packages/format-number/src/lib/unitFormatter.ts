import { buildUnitFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';
import { UnitValueFormatter } from '@localizer/core';
import { Unit } from './unit.js';

/**
 * Creates a formatter for localized unit values.
 *
 * @template T - The type of the values to be formatted, either numbers or bigints.
 * @param options - An optional object specifying the formatting options for unit values.
 * @returns A `UnitValueFormatter` function that formats a value into a localized unit string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `unit` style to generate localized unit strings.
 * It ensures consistent formatting of unit values based on the provided options.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = unitFormatter(options);
 * const formattedValue = formatter(5, 'meter');
 * console.log(formattedValue.localize('en')); // Output: 5.00 m
 *
 * @public
 * @see {@link UnitValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function unitFormatter<T extends number | bigint>(
  options?: NumberFormatOptions
): UnitValueFormatter<T, Unit> {
  return buildUnitFormatter({ ...(options ?? {}), style: 'unit' }, 'unit');
}
