import { autoFormat } from '@localizer/format';

/**
 * Recursively auto-formats a record's values based on specified parameters.
 *
 * This function traverses a record deeply, applying auto-formatting to values
 * whose keys match the specified `autoFormattedParameters`. It also prefixes
 * keys during traversal to maintain the hierarchical structure.
 *
 * @template V - The type of the record being processed.
 * @param value - The record to be auto-formatted.
 * @param autoFormattedParameters - An array of parameter keys to auto-format.
 * @param prefix - A prefix to prepend to keys during traversal.
 * @returns A new record with auto-formatted values.
 *
 * @example
 * const input = {
 *   name: "John",
 *   details: {
 *     age: 30,
 *     address: "123 Main St",
 *   },
 * };
 * const formatted = autoFormatRecordDeep(input, ["details.age"]);
 * console.log(formatted.localize('en'));
 * // Output: {
 * //   name: "John",
 * //   details: {
 * //     age: "30">, // auto-formatted as a string using `decimal` formatter
 * //     address: "123 Main St",
 * //   },
 * // }
 *
 * @internal
 */
export function autoFormatRecordDeep<V extends Record<string, unknown>>(
  value: V,
  autoFormattedParameters: string[] = [],
  prefix?: string
) {
  const preparedValue: Record<string, unknown> = {
    ...value,
  };

  Object.entries(preparedValue)
    .filter(([, value]) => typeof value === 'object')
    .forEach(([key, value]) => {
      preparedValue[key] = autoFormatRecordDeep(
        value as Record<string, unknown>,
        autoFormattedParameters,
        (prefix ?? '') + key + '.'
      );
    });

  Object.entries(preparedValue)
    .filter(([key]) => autoFormattedParameters?.includes((prefix ?? '') + key))
    .forEach(([key, value]) => {
      preparedValue[key] = autoFormat(value);
    });

  return preparedValue;
}
