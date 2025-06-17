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
import { Configuration } from '../../types/configuration.js';

/**
 * Represents the core options for localization configuration.
 *
 * @public
 */
export type CoreOptions = {
  /** An optional array of locale codes to use as fallback locales. */
  fallbackLocales?: LocaleCode[];
  /**
   * A boolean indicating whether implicit localization is enabled.
   * Defaults to `false`.
   *
   * @see {@link implicitLocalizer}
   */
  implicitLocalization?: boolean;
  /**
   * The currently active locale code for implicit localization.
   *
   * @see {@link implicitLocalizer}
   */
  activeLocale?: LocaleCode;
};

/**
 * Singleton instance of core options.
 *
 * The `coreOptions` object holds the default configuration for localization,
 * including fallback locales, implicit localization settings, and the active locale.
 * It can be updated dynamically using the `Core` function.
 *
 * @type {CoreOptions}
 * @internal
 */
export const coreOptions: CoreOptions = {
  implicitLocalization: false,
};

/**
 * Configures the core localization options.
 *
 * @param config - An object containing the core options to be set.
 *
 * @example
 * // Configure the core localization options
 * configure({ Core }, {
 *   Core: {
 *     fallbackLocales: ['en-US', 'fr-FR'],
 *     implicitLocalization: true,
 *     activeLocale: 'en-US',
 *   }
 * });
 *
 * @public
 * @see {@link configure}
 */
export const Core: Configuration<CoreOptions> = (config) => {
  Object.assign(coreOptions, config);
};
