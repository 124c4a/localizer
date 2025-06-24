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
import { Localizer } from '../../types/localizer.js';

const _uninitializedLocalizer = ((): never => {
  throw new TypeError('Attempt to use Localizer before locale was set');
}) as unknown as Localizer;

/**
 * @internal
 * Retrieves the uninitialized `Localizer`.
 *
 * The `getUninitializedLocalizer` function returns the singleton localizer instance,
 * which throws an error when used. This function is useful for scenarios where
 * a `Localizer` is required but has not yet been initialized.
 *
 * @returns The uninitialized `Localizer` that throws an error when invoked.
 */
export function _getUninitializedLocalizer(): Localizer {
  return _uninitializedLocalizer;
}
