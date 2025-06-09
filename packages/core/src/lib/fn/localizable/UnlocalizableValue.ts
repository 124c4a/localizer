import { toPrimitiveValue } from './toPrimitiveValue.js';
import { Localizable } from '../../types/localizable.js';
import { LocaleCode } from '../../consts/locale.js';

/**
 * Represents a value that cannot be localized.
 *
 * The `UnlocalizableValue` class implements the `Localizable` interface but always
 * returns the same value regardless of the locale. It is useful for values that
 * do not require localization.
 *
 * @template T - The type of the unlocalizable value.
 *
 * @internal
 * @see {@link Localizable}
 */
export class UnlocalizableValue<T = string> implements Localizable<T> {
  /**
   * The unlocalizable value.
   * @type {T}
   *
   * @internal
   */
  readonly value: T;

  /**
   * Creates an instance of `UnlocalizableValue`.
   *
   * @param {T} value - The value that cannot be localized.
   *
   * @internal
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Converts the value to a primitive representation.
   *
   * This method is invoked when the object is used in a primitive context,
   * such as string concatenation or numeric operations.
   *
   * @returns {*} The primitive representation of the value.
   *
   * @internal
   */
  [Symbol.toPrimitive]() {
    return toPrimitiveValue(this.value);
  }

  /**
   * Returns the value as a locale-specific string.
   *
   * @returns {T} The unlocalizable value.
   *
   * @internal
   */
  toLocaleString(): T {
    return this.value;
  }

  /**
   * Returns the value without applying localization.
   *
   * @param {LocaleCode | null} locale - The locale code (ignored).
   * @returns {T} The unlocalizable value.
   *
   * @internal
   */
  localize(locale: LocaleCode | null): T {
    return this.value;
  }
}
