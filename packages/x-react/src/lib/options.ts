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
import {
  Configurer,
  declareConfiguration,
  Localizer,
  UninitializedLocalizer,
} from '@localizer/core';

/**
 * Options for React integration.
 *
 * @alpha
 */
export type ReactIntegrationOptions = {
  /**
   * The localizer instance to use for React integration when locale is not set.
   *
   * @alpha
   */
  defaultLocalizer: Localizer;
};

const [_options, _configurer] = declareConfiguration<ReactIntegrationOptions>('ReactIntegration', {
  defaultLocalizer: UninitializedLocalizer,
});

/**
 * Updates auto format options.
 *
 * @alpha
 */
export const ReactIntegration: Configurer<ReactIntegrationOptions> = _configurer;

/**
 * Options for React integration.
 *
 * @internal
 */
export const _reactIntegrationOptions = _options;
