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
 * Core functionality of the `@localizer` library, offering types and utilities for localization,
 * localizable entities, and locale management.
 *
 * @packageDocumentation
 *
 * @public
 */
export * from './lib/types/localizable.js';
export * from './lib/types/localizer.js';
export * from './lib/types/formatter.js';
export * from './lib/types/configuration.js';

export * from './lib/fn/configure.js';
export * from './lib/fn/declare-configuration.js';

export { type CoreOptions, Core, setActiveLocale } from './lib/fn/locale/options.js';

export * from './lib/fn/locale/get-locale-chain.js';
export * from './lib/fn/locale/get-primary-locale.js';
export * from './lib/fn/locale/parse-locale-code.js';

export * from './lib/fn/localizable/loc.js';
export * from './lib/fn/localizable/localizeArray.js';
export * from './lib/fn/localizable/localizeObject.js';
export * from './lib/fn/localizable/is-localizable.js';

export * from './lib/fn/localizer/get-localizer.js';

export * from './lib/consts/empty.js';
export { type LanguageCode, type CountryCode, type LocaleCode } from './lib/consts/locale.js';
export * from './lib/consts/localizers.js';
