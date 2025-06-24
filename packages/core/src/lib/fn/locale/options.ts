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
import { Configurer } from '../../types/configuration.js';

/**
 * @public
 *
 * Represents the core options for localization configuration.
 */
export interface CoreOptions {
  /**
   * @public
   *
   * An optional array of locale codes to use as fallback locales. Defaults to `['en']`.
   *
   * @defaultValue `['en']`
   */
  fallbackLocales: LocaleCode[];
  /**
   * @alpha
   *
   * The currently active locale code for implicit localization. If not set, implicit localization will not be applied.
   *
   * @defaultValue `undefined`
   */
  activeLocale: LocaleCode | undefined;
}

/**
 * @internal
 *
 * Singleton instance of core options.
 *
 * The `coreOptions` object holds the default configuration for localization,
 * including fallback locales, implicit localization settings, and the active locale.
 * It can be updated dynamically using the `Core` function.
 */
export const coreOptions: CoreOptions = {
  fallbackLocales: ['en'],
  activeLocale: undefined,
};

/**
 * @public
 *
 * Configures the core localization options.
 *
 * @param config - An object containing the core options to be set.
 *
 * @example
 * ```typescript
 * // Configure the core localization options
 * configure({ Core }, {
 *   Core: {
 *     fallbackLocales: ['en-US', 'fr-FR'],
 *     implicitLocalization: true,
 *     activeLocale: 'en-US',
 *   }
 * });
 * ```
 */
export const Core: Configurer<CoreOptions> = (config) => {
  Object.assign(coreOptions, config);
};

/**
 * @alpha
 *
 * Sets the active locale and enables implicit localization.
 *
 * @param locale - The locale code to set as the active locale.
 *
 * @example
 * ```typescript
 * const localizable: Localizable = ...; // Your localizable object
 * setActiveLocale('en-US');
 *
 * console.log(localizable); // Outputs the localizable object with 'en-US' as the active locale
 * ```
 */
export function setActiveLocale(locale: LocaleCode) {
  coreOptions.activeLocale = locale;
}
