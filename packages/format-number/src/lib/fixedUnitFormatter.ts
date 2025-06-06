import { buildFormatter } from './build.js';
import { NumberFormatOptions } from './options.js';
import { ValueFormatter } from '@localizer/core';
import { Unit } from './unit.js';

/**
 * Creates a formatter for localized fixed unit values.
 *
 * @template T - The type of the value to be formatted, either a number or a bigint.
 * @param unit - The unit to be used for formatting (e.g., 'meter', 'kilogram').
 * @param options - An optional object specifying the formatting options for unit values.
 * @returns A `ValueFormatter` function that formats a number into a localized fixed unit string.
 *
 * The formatter uses the `Intl.NumberFormat` API with the `unit` style to generate localized unit strings.
 * It ensures the specified unit is fixed and consistent across all formatted values.
 *
 * @example
 * const options = { minimumFractionDigits: 2 };
 * const formatter = fixedUnitFormatter('meter', options);
 * const formattedValue = formatter(1234.56);
 * console.log(formattedValue.localize('en')); // Output: 1,234.56 m
 *
 * @public
 * @see {@link ValueFormatter}, {@link NumberFormatOptions}, {@link Intl.NumberFormat}
 */
export function fixedUnitFormatter<T extends number | bigint>(
  unit: Unit,
  options?: NumberFormatOptions
): ValueFormatter<T> {
  return buildFormatter({ ...(options ?? {}), style: 'unit', unit });
}
