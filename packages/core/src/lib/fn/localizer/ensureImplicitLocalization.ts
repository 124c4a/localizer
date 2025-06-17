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
import { coreOptions } from '../locale/options.js';

/**
 * Ensures that implicit localization is enabled and an active locale is set.
 *
 * The `ensureImplicitLocalization` function checks whether implicit localization
 * is enabled in the `coreOptions` and verifies that an active locale is defined.
 * If these conditions are not met, it throws an error. Otherwise, it returns the
 * active locale.
 *
 * @throws {RangeError} Throws an error if implicit localization is disabled or
 * if no active locale is set.
 *
 * @returns {LocaleCode} The active locale code.
 *
 * @example
 * // Assuming `coreOptions` is properly configured:
 * const locale = ensureImplicitLocalization();
 * console.log(locale); // Outputs the active locale code.
 *
 * @internal
 */
export function ensureImplicitLocalization(): LocaleCode {
  if (
    !coreOptions.implicitLocalization ||
    coreOptions.activeLocale === undefined
  ) {
    throw new RangeError(
      'Implicit localization requires an active locale to be set.'
    );
  } else {
    return coreOptions.activeLocale;
  }
}
