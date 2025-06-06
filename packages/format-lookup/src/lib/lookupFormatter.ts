import { isLocalizable, Localizable, ValueFormatter } from '@localizer/core';

/**
 * This symbol can be used as a key in a lookup table to represent values that are `undefined`.
 *
 * @beta
 * @see {@link LookupTable}, {@link lookupFormatter}
 */
export const UndefinedValue: unique symbol = Symbol();
/**
 * This symbol can be used as a key in a lookup table to represent values that are `null`.
 *
 * @beta
 * @see {@link LookupTable}, {@link lookupFormatter}
 */
export const NullValue: unique symbol = Symbol();

/**
 * This symbol can be used as a key in a lookup table to represent values that are either `undefined` or `null`.
 *
 * @beta
 * @see {@link LookupTable}, {@link lookupFormatter}
 */
export const NoValue: unique symbol = Symbol();
/**
 * This symbol can be used as a key in a lookup table to specify a fallback value when no other key matches.
 *
 * @beta
 * @see {@link LookupTable}, {@link lookupFormatter}
 */
export const DefaultValue: unique symbol = Symbol();

/**
 * Type definition for a lookup table.
 *
 * A lookup table maps specific values or special symbols to either localizable values or value formatters.
 *
 * @template T - The type of values that the lookup table can handle.
 * @beta
 * @see {@link lookupFormatter}, {@link UndefinedValue}, {@link NullValue}, {@link NoValue}, {@link DefaultValue}
 */
export type LookupTable<T> = {
  [K in T extends string | number ? T : never]?:
    | Localizable
    | ValueFormatter<K>;
} & {
  [K in
    | typeof UndefinedValue
    | typeof NoValue
    | typeof NullValue]?: Localizable;
} & {
  [K in typeof DefaultValue]?: Localizable | ValueFormatter<T>;
};

/**
 * Multivariant formatter depending on value.
 *
 * This function creates a value formatter that selects the appropriate formatting logic based on the input value.
 * It uses a lookup table (`lut`) to determine the formatter or localizable value to apply.
 *
 * Special symbols (`NoValue`, `UndefinedValue`, `NullValue`, `DefaultValue`) can be used in the lookup table
 * to handle specific cases such as `undefined`, `null`, or fallback values.
 *
 * @template T - The type of values that the formatter can handle.
 * @param lut - The lookup table containing mappings of values to localizable values or formatters.
 * @returns A function that formats the input value based on the lookup table.
 * @throws {RangeError} If the input value is not represented in the lookup table and no default value is specified.
 *
 * @example
 * const formatter = lookupFormatter({
 *   [UndefinedValue]: loc`[undefined]`,
 *   [NullValue]: loc`[null]`,
 *   [DefaultValue]: (value) => loc`Value: ${value}`,
 * });
 * console.log(formatter(undefined).localize('en')); // Output: "[undefined]"
 * console.log(formatter(null).localize('en')); // Output: "[null]"
 * console.log(formatter(42).localize('en')); // Output: "Value: 42"
 *
 * @beta
 * @see {@link LookupTable}, {@link UndefinedValue}, {@link NullValue}, {@link NoValue}, {@link DefaultValue}
 */
export function lookupFormatter<T>(lut: LookupTable<T>): ValueFormatter<T> {
  return (value) => {
    let result;
    if (value === undefined) {
      result = lut[UndefinedValue] ?? lut[NoValue];
    } else if (value === null) {
      result = lut[NullValue] ?? lut[NoValue];
    } else {
      result = lut[value];
    }
    result = result ?? lut[DefaultValue];
    if (!result) {
      throw new RangeError(
        `Value ${value} is not represented in [${[...Object.keys(lut)].join(
          ', '
        )}], but no default value is specified`
      );
    }
    if (isLocalizable(result)) {
      return result;
    } else {
      return result(value);
    }
  };
}
