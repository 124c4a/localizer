import {
  Configuration,
  ConfigurationProperties,
} from '../types/configuration.js';

/**
 * Configures a set of properties using their corresponding configuration functions.
 *
 * The `configure` function iterates over the keys of the provided `arg` object,
 * which contains configuration functions, and applies the values from the `values`
 * object to these functions. If a value exists for a key in `values`, the corresponding
 * configuration function in `arg` is invoked with that value.
 *
 * @template T - A record type where the keys are strings and the values are `Configuration` functions.
 *
 * @param {T} arg - An object containing configuration functions for each property.
 * @param {ConfigurationProperties<T>} values - An object containing values to be passed to the configuration functions.
 *
 * @example
 * const configurations = {
 *   name: (value) => console.log(`Configuring name: ${value}`),
 *   age: (value) => console.log(`Configuring age: ${value}`),
 * };
 * const values = { name: "John", age: 30 };
 * configure(configurations, values);
 * // Output:
 * // Configuring name: John
 * // Configuring age: 30
 *
 * @example
 * import { configure, Core } from '@localizer/core';
 * import { DefaultDecimalFormat } from '@localizer/format';
 *
 * // Configure the core and default decimal format
 * configure({ Core, DefaultDecimalFormat }, {
 *   Core: {
 *     implicitLocalization: true,
 *     activeLocale: 'en',
 *   },
 *   DefaultDecimalFormat: {
 *     style: 'decimal',
 *     minimumFractionDigits: 2,
 *     maximumFractionDigits: 2,
 *   },
 * });
 *
 * @public
 * @see {@link Configuration}, {@link ConfigurationProperties}, {@link Core}
 */
export function configure<T extends Record<string, Configuration<object>>>(
  arg: T,
  values: ConfigurationProperties<T>
) {
  for (const key in arg) {
    if (values[key]) {
      arg[key](values[key]);
    }
  }
}
