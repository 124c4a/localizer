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
import { Localized } from '../../types/localizable.js';
import { isLocalizable } from './is-localizable.js';

/**
 * @public
 * Localizes an array of values using the given locale.
 *
 * @typeParam T - Type of the array elements.
 * @param values - Array of values to localize.
 * @param locale - Locale code or `null` for no localization.
 * @returns Localized array.
 *
 * @see {@link Localizable}
 */
export function localizeArray<T extends unknown[]>(
  values: T,
  locale: LocaleCode | null,
): Localized<T> {
  return values.map((value) =>
    isLocalizable(value) ? value.localize(locale) : value,
  ) as Localized<T>;
}
