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
import { LocaleCode } from '../../consts/locale.js';
import { Localizable } from '../../types/localizable.js';
import { ensureImplicitLocalization } from '../localizer/ensureImplicitLocalization.js';
import { toPrimitiveValue } from './toPrimitiveValue.js';

/**
 * Represents a value that can be localized based on a given locale.
 *
 * The `LocalizableValue` class implements the `Localizable` interface and provides
 * functionality to localize a value using a provided localization function. It also
 * supports conversion to primitive values and locale-specific string representations.
 *
 * @template T - The type of the localized value.
 *
 * @internal
 */
export class LocalizableValue<T = string> implements Localizable<T> {
  /**
   * A function that localizes the value based on the provided locale.
   * @type {(locale: LocaleCode | null) => T}
   *
   * @internal
   */
  readonly localize: (locale: LocaleCode | null) => T;

  /**
   * Creates an instance of `LocalizableValue`.
   *
   * @param {(locale: LocaleCode | null) => T} localizeFn - The function used to localize the value.
   *
   * @internal
   */
  constructor(localizeFn: (locale: LocaleCode | null) => T) {
    this.localize = localizeFn;
  }

  /**
   * Converts the localized value to a primitive representation.
   *
   * This method is invoked when the object is used in a primitive context,
   * such as string concatenation or numeric operations.
   *
   * @returns {*} The primitive representation of the localized value.
   *
   * @internal
   */
  [Symbol.toPrimitive]() {
    const localizedValue = this.localize(ensureImplicitLocalization());

    return toPrimitiveValue(localizedValue);
  }

  /**
   * Returns the localized value as a locale-specific string.
   *
   * If an array of locales is provided, the first locale in the array is used.
   * If a single locale is provided, it is used directly. If no locale is provided,
   * the implicit localization is used.
   *
   * @param {LocaleCode | LocaleCode[] | null} [locale] - The locale(s) to use for localization.
   * @returns {T} The localized value.
   *
   * @internal
   */
  toLocaleString(locale?: LocaleCode | LocaleCode[] | null): T {
    if (Array.isArray(locale) && locale.length > 0) {
      return this.localize(locale[0]);
    } else if (typeof locale === 'string') {
      return this.localize(locale);
    } else {
      return this.localize(ensureImplicitLocalization());
    }
  }
}
