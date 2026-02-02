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
import { Localizer } from '../../../types/localizer.js';

const _uninitializedLocalizer = ((): never => {
  throw new Error('Attempt to use Localizer before locale was set');
}) as unknown as Localizer;

/**
 * Returns a `Localizer` that throws an error when used.
 *
 * Useful as a placeholder before the `Localizer` is initialized.
 *
 * @returns The uninitialized `Localizer`.
 *
 * @internal
 */
export function _getUninitializedLocalizer(): Localizer {
  return _uninitializedLocalizer;
}
