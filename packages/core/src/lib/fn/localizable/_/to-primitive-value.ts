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

/**
 * Converts a value to its primitive representation.
 *
 * @param   value - The value to convert.
 *
 * @returns       The primitive representation of the value.
 *
 * @internal
 */
export function _toPrimitiveValue(value: unknown) {
  if (value === null || value === undefined) {
    return value;
  }

  switch (typeof value) {
    case 'bigint':
    case 'boolean':
    case 'number':
    case 'string':
      return value;
    default:
      return Object.prototype.toString.call(value);
  }
}
