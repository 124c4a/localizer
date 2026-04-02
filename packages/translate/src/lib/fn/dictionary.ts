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
import { Dictionary, LoadableDictionary } from '../types/dictionary.js';
import { SplitStructure } from '../types/dictionary.js';
import { MessageFormatDictionary } from './_/message-format-dictionary.js';
import { globalRegistry } from './registry.js';

/**
 * Creates a new dictionary instance using the provided identifier and loadable dictionary.
 *
 * @param   id         - A unique identifier for the dictionary.
 * @param   dictionary - A loadable dictionary containing key-value pairs defining translations for
 *   different locales.
 *
 * @returns            A promise that resolves to a `Dictionary<string>` instance initialized with
 *   the provided data and previously loaded locales.
 *
 * @alpha
 */
export async function asyncDictionary(
  id: string,
  dictionary: LoadableDictionary<string, string>,
): Promise<Dictionary<string>> {
  return globalRegistry.registerDictionary(new MessageFormatDictionary(id, dictionary));
}

/**
 * Creates a new dictionary instance using the provided identifier and statically defined
 * dictionary.
 *
 * @param   id         - A unique identifier for the dictionary.
 * @param   dictionary - A statically defined dictionary containing key-value pairs defining
 *   translations for different locales.
 *
 * @returns            An instance of `Dictionary<string>` initialized with the provided data.
 *
 * @alpha
 */
export function dictionary(
  id: string,
  dictionary: SplitStructure<string, string>,
): Dictionary<string> {
  return new MessageFormatDictionary(id, dictionary);
}
