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
import type { LocaleCode } from '@localizer/core';

import type { Dictionary } from '../types/dictionary.js';

import { globalRegistry, GlobalRegistry } from './registry.js';

// Helper to create a mock Dictionary
function createMockDictionary<T>() {
  return {
    loadLocale: vi.fn().mockResolvedValue(undefined),
  } as unknown as Dictionary<T>;
}

describe('GlobalRegistry', () => {
  let registry: typeof globalRegistry;
  let mockDictionaryA: Dictionary<string>;
  let mockDictionaryB: Dictionary<number>;
  const locale1 = 'en-US' as LocaleCode;
  const locale2 = 'fi-FI' as LocaleCode;

  beforeEach(() => {
    registry = new GlobalRegistry();
    mockDictionaryA = createMockDictionary<string>();
    mockDictionaryB = createMockDictionary<number>();
  });

  it('registers a dictionary and returns it', async () => {
    const result = await registry.registerDictionary(mockDictionaryA);
    expect(result).toBe(mockDictionaryA);
  });

  it('calls loadLocale on newly registered dictionary for already loaded locales', async () => {
    await registry.loadLocale(locale1);
    await registry.loadLocale(locale2);

    const dict = createMockDictionary<string>();
    await registry.registerDictionary(dict);

    expect(dict.loadLocale).toHaveBeenCalledTimes(2);
    expect(dict.loadLocale).toHaveBeenCalledWith(locale1);
    expect(dict.loadLocale).toHaveBeenCalledWith(locale2);
  });

  it('calls loadLocale on all registered dictionaries when loading a locale', async () => {
    await registry.registerDictionary(mockDictionaryA);
    await registry.registerDictionary(mockDictionaryB);

    await registry.loadLocale(locale1);

    expect(mockDictionaryA.loadLocale).toHaveBeenCalledWith(locale1);
    expect(mockDictionaryB.loadLocale).toHaveBeenCalledWith(locale1);
  });

  it('accumulates loaded locales and applies them to new dictionaries', async () => {
    await registry.loadLocale(locale1);
    await registry.loadLocale(locale2);

    const dict = createMockDictionary<string>();
    await registry.registerDictionary(dict);

    expect(dict.loadLocale).toHaveBeenCalledWith(locale1);
    expect(dict.loadLocale).toHaveBeenCalledWith(locale2);
    expect(dict.loadLocale).toHaveBeenCalledTimes(2);
  });

  it('does not call loadLocale on dictionaries when no locales have been loaded', async () => {
    const dict = createMockDictionary<string>();
    await registry.registerDictionary(dict);

    expect(dict.loadLocale).not.toHaveBeenCalled();
  });

  it('calls loadLocale on all dictionaries for each loaded locale', async () => {
    await registry.registerDictionary(mockDictionaryA);
    await registry.loadLocale(locale1);
    await registry.loadLocale(locale2);

    expect(mockDictionaryA.loadLocale).toHaveBeenCalledWith(locale1);
    expect(mockDictionaryA.loadLocale).toHaveBeenCalledWith(locale2);
    expect(mockDictionaryA.loadLocale).toHaveBeenCalledTimes(2);
  });
});
