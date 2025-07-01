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
 * A `Localizer` bound to the `activeLocale` from the configuration. Enables localization using the
 * current active locale without explicitly specifying it.
 *
 * @alpha
 *
 * @see {@link Localizer} , {@link Core}
 */
export const ImplicitLocalizer: Localizer = _getImplicitLocalizer();

/**
 * A Localizer instance that is unbound to any locale and throws an error when used.
 *
 * @public
 */
export const UninitializedLocalizer: Localizer = _getUninitializedLocalizer();

/**
 * A Localizer that returns stable identifiers instead of localized strings. Useful for generating
 * unique, locale-independent identifiers.
 *
 * @public
 */
export const IdentityLocalizer: Localizer = _getIdentityLocalizer();
