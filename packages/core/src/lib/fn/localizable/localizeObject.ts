/*
 * Copyright 2026 Artem Godin.
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
import { Localized } from '../../types/localizable.js';
import { isLocalizable } from './is-localizable.js';

/**
 * Localizes an object's properties by converting `Localizable` values to their localized forms.
 *
 * @typeParam T - The input object type with properties that may be `Localizable`.
 *
 * @param   values - The object with properties to localize.
 * @param   locale - The locale code for localization, or `null` for a default.
 *
 * @returns        A new object with `Localizable` properties replaced by localized values.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export function localizeObject<T extends Record<string, unknown>>(
  values: T,
  locale: LocaleCode | null,
): Localized<T> {
  if (typeof values !== 'object' || values === null || Array.isArray(values)) {
    throw new TypeError(
      'Expected an object with properties to localize, got ' +
        (Array.isArray(values) ? 'array' : typeof values),
    );
  }
  const result: Partial<Record<string, unknown>> = { ...values };
  Object.entries(result).forEach(([key, value]) => {
    if (isLocalizable(value)) {
      result[key] = value.localize(locale);
    }
  });
  return result as Localized<T>;
}
