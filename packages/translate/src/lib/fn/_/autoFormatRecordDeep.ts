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
import { autoFormat } from '@localizer/format';

/**
 * Recursively auto-formats a record's values based on specified parameters.
 *
 * This function traverses a record deeply, applying auto-formatting to values whose keys match the
 * specified `autoFormattedParameters`. It also prefixes keys during traversal to maintain the
 * hierarchical structure.
 *
 * @typeParam V - The type of the record being processed.
 *
 * @param   value                   - The record to be auto-formatted.
 * @param   autoFormattedParameters - An array of parameter keys to auto-format.
 * @param   prefix                  - A prefix to prepend to keys during traversal.
 *
 * @returns                         A new record with auto-formatted values.
 *
 * @internal
 */
export function _autoFormatRecordDeep<V extends Record<string, unknown>>(
  value: V,
  autoFormattedParameters: string[] = [],
  prefix?: string,
) {
  const preparedValue: Record<string, unknown> = {
    ...value,
  };

  Object.entries(preparedValue)
    .filter(([, value]) => typeof value === 'object')
    .forEach(([key, value]) => {
      preparedValue[key] = _autoFormatRecordDeep(
        value as Record<string, unknown>,
        autoFormattedParameters,
        (prefix ?? '') + key + '.',
      );
    });

  Object.entries(preparedValue)
    .filter(([key]) => autoFormattedParameters?.includes((prefix ?? '') + key))
    .forEach(([key, value]) => {
      preparedValue[key] = autoFormat(value);
    });

  return preparedValue;
}
