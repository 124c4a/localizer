/**
 * Represents a configuration function that operates on a value of type `V`.
 *
 * The `Configuration` type is used to define functions that take a value
 * and perform configuration-related operations on it.
 *
 * @template V - The type of the value to be configured.
 *
 * @example
 * const configureValue: Configuration<string> = (value) => {
 *   console.log(`Configuring value: ${value}`);
 * };
 * configureValue("example"); // Output: Configuring value: example
 *
 * @public
 * @see {@link ConfigurationProperties}, {@link configure}
 */
export type Configuration<V> = (value: V) => void;

/**
 * Represents a mapped type that extracts configuration properties from a given type `T`.
 *
 * The `ConfigurationProperties` type maps over the keys of `T` and, for each key,
 * determines the type of the value that can be configured if the corresponding property
 * is a `Configuration` type.
 *
 * @template T - The type containing configuration properties.
 *
 * @example
 * type Configurable = {
 *   name: Configuration<string>;
 *   age: Configuration<number>;
 * };
 * type Properties = ConfigurationProperties<Configurable>;
 * // Properties is equivalent to:
 * // {
 * //   name?: string;
 * //   age?: number;
 * // }
 *
 * @public
 * @see {@link Configuration}, {@link configure}
 */
export type ConfigurationProperties<T> = {
  [K in keyof T]?: T[K] extends Configuration<infer V> ? V : never;
};
