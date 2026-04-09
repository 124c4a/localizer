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
import { Localizable, loc } from '@localizer/core';

/**
 * Converts any value to a `Localizable` object.
 *
 * @param   value - The value to convert.
 *
 * @returns       A `Localizable` object that provides the string representation of the value.
 *
 * @public
 */
export function stringify(value: unknown): Localizable {
  return loc(() => String(value));
}
