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
import { LocaleCode } from '../../../consts/locale.js';
import { Localizable } from '../../../types/localizable.js';
import { _ensureImplicitLocalization } from '../../localizer/_/ensure-implicit-localization.js';
import { _toPrimitiveValue } from './to-primitive-value.js';

/**
 * @public
 *
 * A value that can be localized using a provided function.
 *
 * @typeParam T - The type of the localized value.
 */
export class LocalizableValue<T = string> implements Localizable<T> {
  /**
   * @internal
   * Localizes the value using the given locale.
   */
  readonly localize: (locale: LocaleCode | null) => T;

  /**
   * @internal
   *
   * Initializes a `LocalizableValue` with a localization function.
   *
   * @param localizeFn - Function to localize the value.
   */
  constructor(localizeFn: (locale: LocaleCode | null) => T) {
    this.localize = localizeFn;
  }

  /**
   * @internal
   *
   * Converts the localized value to a primitive type.
   *
   * Used in contexts like string concatenation or numeric operations.
   *
   * @returns The primitive representation of the value.
   */
  [Symbol.toPrimitive]() {
    const localizedValue = this.localize(_ensureImplicitLocalization());

    return _toPrimitiveValue(localizedValue);
  }

  /**
   * @public
   *
   * Returns the value localized to the given locale.
   *
   * If multiple locales are provided, the first is used.
   * Falls back to implicit localization if none is provided.
   *
   * @param locale - Locale(s) for localization.
   * @returns Localized value.
   */
  toLocaleString(locale?: LocaleCode | LocaleCode[] | null): T {
    if (Array.isArray(locale) && locale.length > 0) {
      return this.localize(locale[0]);
    } else if (typeof locale === 'string') {
      return this.localize(locale);
    } else {
      return this.localize(_ensureImplicitLocalization());
    }
  }
}
