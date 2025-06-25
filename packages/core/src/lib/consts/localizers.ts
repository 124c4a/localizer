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
import { _getIdentityLocalizer } from '../fn/localizer/_/get-identity-localizer.js';
import { _getImplicitLocalizer } from '../fn/localizer/_/get-implicit-localizer.js';
import { _getUninitializedLocalizer } from '../fn/localizer/_/get-uninitialized-localizer.js';
import { Localizer } from '../types/localizer.js';

/**
 * @alpha
 *
 * An implicitly determined `Localizer` instance.
 *
 * The `ImplicitLocalizer` is a `Localizer` bound to the `activeLocale` set in the configuration.
 * It binds localization functionality to the implicitly determined locale, enabling seamless
 * localization without explicitly specifying the locale.
 *
 * @see {@link Localizer}, {@link Core}
 */
export const ImplicitLocalizer: Localizer = _getImplicitLocalizer();

/**
 * @public
 *
 * Special Localizer instance that is not bound to any locale. When used, it will throw an error.
 */
export const UninitializedLocalizer: Localizer = _getUninitializedLocalizer();

/**
 * @alpha
 *
 * Special Localizer instance that produces stable identifiers instead of localized strings.
 * It is useful for cases where you need a unique identifier that does not change with locale or value.
 */
export const IdentityLocalizer: Localizer = _getIdentityLocalizer();
