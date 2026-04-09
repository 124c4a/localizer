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
/**
 * Localization support for React.
 *
 * @alpha
 *
 * @packageDocumentation
 */
export { ReactIntegration, type ReactIntegrationOptions } from './lib/options.js';
export {
  LocalizationContext,
  type LocalizationContextProps,
} from './lib/components/localization-context.js';
export { Localized, type LocalizedProps } from './lib/components/localized.js';

export { type LocalizerContext } from './lib/localizer-context.js';
export { useLocalizer } from './lib/hooks/use-localizer.js';
