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
import { getImplicitLocalizer } from '../fn/localizer/getImplicitLocalizer.js';
import { Localizer } from '../types/localizer.js';

/**
 * An implicitly determined `Localizer` instance.
 *
 * The `implicitLocalizer` is a `Localizer` bound to the `activeLocale` set in the configuration.
 * It binds localization functionality to the implicitly determined locale, enabling seamless
 * localization without explicitly specifying the locale.
 *
 * @type {Localizer}
 *
 * @example
 * // Enable implicit localization and set the active locale
 * configure(
 *   { Core },
 *   {
 *     Core: {
 *       implicitLocalization: true,
 *       activeLocale: 'en',
 *     },
 *   }
 * );
 *
 * const localizable = loc((locale) => `Hello, ${locale}!`);
 *
 * // Get the implicit localizer
 * const localizer = implicitLocalizer;
 * console.log(localizer(localizable)); // Output: Hello, en!
 *
 * @public
 * @see {@link Localizer}, {@link Core}
 */
export const implicitLocalizer: Localizer = getImplicitLocalizer();
