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
export * from './lib/types/localizable.js';
export * from './lib/types/localizer.js';
export * from './lib/types/formatter.js';
export * from './lib/types/configuration.js';

export * from './lib/fn/configure.js';

export { type CoreOptions, Core } from './lib/fn/locale/options.js';

export * from './lib/fn/locale/getLocaleChain.js';
export * from './lib/fn/locale/getPrimaryLocale.js';
export * from './lib/fn/locale/parseLocaleCode.js';

export * from './lib/fn/localizable/loc.js';
export * from './lib/fn/localizable/localizeArray.js';
export * from './lib/fn/localizable/localizeObject.js';
export * from './lib/fn/localizable/isLocalizable.js';

export * from './lib/fn/localizer/getLocalizer.js';
export * from './lib/fn/localizer/getUninitializedLocalizer.js';

export * from './lib/consts/Empty.js';
export * from './lib/consts/locale.js';
export * from './lib/consts/implicitLocalizer.js';
