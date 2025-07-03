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
import { declareConfiguration } from '../declare-configuration.js';

/**
 * Core localization configuration options.
 *
 * @public
 */
export interface CoreOptions {
  /**
   * Optional fallback locale codes. Defaults to `['en']`.
   *
   * @defaultValue `['en']`
   *
   * @public
   */
  fallbackLocales: LocaleCode[];

  /**
   * Active locale code for implicit localization. If unset, implicit localization is disabled.
   *
   * @defaultValue `undefined`
   *
   * @alpha
   */
  activeLocale: LocaleCode | undefined;
}

const [coreOptions, Core] = declareConfiguration<CoreOptions>('Core', {
  fallbackLocales: ['en'],
  activeLocale: undefined,
});

export {
  /**
   * Singleton instance of core localization options.
   *
   * Holds default settings like fallback locales and active locale. Can be updated dynamically via
   * the `Core` function.
   *
   * @internal
   */
  coreOptions,

  /**
   * Updates core localization options.
   *
   * @public
   */
  Core,
};

/**
 * Activates implicit localization by setting the active locale.
 *
 * @param locale - The locale code to activate.
 *
 * @public
 */
export function setActiveLocale(locale: LocaleCode) {
  coreOptions.activeLocale = locale;
}
