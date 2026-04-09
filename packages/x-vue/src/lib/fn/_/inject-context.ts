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
import { inject } from 'vue';

import { _vueIntegrationOptions } from '../../options.js';
import { _localizationContextSymbol, InternalContext } from './internal-context.js';

/**
 * This function provides a fallback context when no localization context is available.
 *
 * @returns Default localization context.
 *
 * @internal
 */
function _getDefaultContext(): Readonly<InternalContext> {
  return {
    localizer: _vueIntegrationOptions.defaultLocalizer,
    setActiveLocale: () => {
      throw new Error(
        'Attempt to set locale without a localizer. Did you use `localizerPlugin` or `LocalizationContext`?',
      );
    },
  } as const;
}

/**
 * Retrieves the current localization context from the Vue injection system.
 *
 * @returns The current localization context.
 *
 * @internal
 */
export function _injectContext(): Readonly<InternalContext> {
  return inject(_localizationContextSymbol, _getDefaultContext, true);
}
