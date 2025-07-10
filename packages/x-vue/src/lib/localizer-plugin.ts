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
import { LocaleCode } from '@localizer/core';
import { Plugin } from 'vue';

import { LocalizationContext } from './components/localization-context.js';
import { Localized } from './components/localized.js';
import { _provideContext } from './fn/_/provide-context.js';

/**
 * Options for the Localizer plugin.
 *
 * @alpha
 */
export interface LocalizerPluginOptions {
  /**
   * The initial locale to set for the localizer. This is optional and will default to the
   * configured fallback language if not provided.
   *
   * @alpha
   */
  initialLocale?: LocaleCode;

  /**
   * If true, the plugin will use the global context for localization. This is useful for
   * applications that want to provide a global localization context. If not set, the context must
   * be provided manually using {@link LocalizationContext}.
   *
   * @defaultValue true
   *
   * @alpha
   */
  useGlobalContext?: boolean;
}

/**
 * Plugin for providing localization context in Vue.js applications.
 *
 * @alpha
 */
export const localizerPlugin: Plugin<LocalizerPluginOptions> = {
  install(app, options) {
    if (options?.useGlobalContext ?? true) {
      // If the global context is used, we provide it to the app.
      // This allows components to access the localizer without needing to wrap them in
      // LocalizationProvider.
      _provideContext(options?.initialLocale, app.provide);
    }
    app.component('x-localized', Localized);
    app.component('x-localization-context', LocalizationContext);
  },
};
