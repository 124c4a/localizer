/**
 * Converts a value to its primitive representation.
 *
 * The `toPrimitiveValue` function takes an input value and returns its primitive
 * representation based on its type. If the value is of a primitive type such as
 * `bigint`, `boolean`, `number`, `symbol`, `string`, or `undefined`, it is returned
 * as-is. For non-primitive types, the function returns the result of calling
 * `Object.prototype.toString` on the value.
 *
 * @param {unknown} value - The value to convert to a primitive representation.
 * @returns {unknown} The primitive representation of the input value.
 *
 * @example
 * console.log(toPrimitiveValue(42)); // 42
 * console.log(toPrimitiveValue("hello")); // "hello"
 * console.log(toPrimitiveValue({})); // "[object Object]"
 *
 * @internal
 */
export function toPrimitiveValue(value: unknown) {
  switch (typeof value) {
    case 'bigint':
    case 'boolean':
    case 'number':
    case 'symbol':
    case 'string':
    case 'undefined':
      return value;
    default:
      return Object.prototype.toString.call(value);
  }
}
