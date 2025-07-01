/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Localizable } from '../../../types/localizable.js';
import { _toPrimitiveValue } from './to-primitive-value.js';

/**
 * Represents a value that cannot be localized.
 *
 * The `UnlocalizableValue` class implements the `Localizable` interface but
 * always returns the same value regardless of the locale. It is useful for
 * values that do not require localization.
 *
 * @typeParam T - The type of the unlocalizable value.
 *
 * @internal
 *
 * @see {@link Localizable}
 */
export class UnlocalizableValue<T = string> implements Localizable<T> {
  /**
   * The unlocalizable value.
   *
   * @internal
   */
  readonly value: T;

  /**
   * Creates an instance of `UnlocalizableValue`.
   *
   * @param value - The value that cannot be localized.
   *
   * @internal
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Converts the value to its primitive form. Used in contexts like string
   * concatenation or numeric operations.
   *
   * @returns The primitive value.
   *
   * @internal
   */
  [Symbol.toPrimitive]() {
    return _toPrimitiveValue(this.value);
  }

  /**
   * Returns the value as a string formatted for the current locale.
   *
   * @returns The value as a locale-specific string.
   *
   * @internal
   */
  toLocaleString(): T {
    return this.value;
  }

  /**
   * Returns the unlocalizable value.
   *
   * @param   locale - Ignored.
   *
   * @returns        The value.
   *
   * @internal
   */
  localize(): T {
    return this.value;
  }
}
