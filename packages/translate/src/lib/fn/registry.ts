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
import { LocaleCode } from '@localizer/core';

import { Dictionary } from '../types/dictionary.js';

/**
 * Interface for managing localization dictionaries and loading locales.
 *
 * @alpha
 */
export interface Registry {
  /**
   * Registers a new translation dictionary and load previously loaded locales.
   *
   * @typeParam T - The type of the dictionary keys.
   *
   * @param   dictionary - The dictionary to register.
   *
   * @returns            The registered dictionary.
   *
   * @alpha
   */
  registerDictionary<T>(dictionary: Dictionary<T>): Promise<Dictionary<T>>;
  /**
   * Loads a specific locale.
   *
   * @param locale - The locale to load.
   *
   * @alpha
   */
  loadLocale(locale: LocaleCode): Promise<void>;
}

/**
 * Global registry for managing localization dictionaries and loaded locales.
 *
 * @internal
 */
export class GlobalRegistry implements Registry {
  private dictionaries: Set<Dictionary<unknown>> = new Set();
  private loadedLocales: LocaleCode[] = [];

  /**
   * Registers a new translation dictionary.
   *
   * @param   dictionary - The dictionary to register.
   *
   * @returns            The registered dictionary.
   *
   * @internal
   */
  async registerDictionary<T>(dictionary: Dictionary<T>): Promise<Dictionary<T>> {
    this.dictionaries.add(dictionary);

    if (this.loadedLocales.length > 0) {
      await Promise.all(this.loadedLocales.map((locale) => dictionary.loadLocale(locale)));
    }

    return dictionary;
  }

  /**
   * Loads a specific locale.
   *
   * @param locale - The locale to load.
   *
   * @internal
   */
  async loadLocale(locale: LocaleCode): Promise<void> {
    await Promise.all(
      Array.from(this.dictionaries).map((dictionary) => dictionary.loadLocale(locale)),
    );
    this.loadedLocales.push(locale);
  }
}

/**
 * Global registry for managing localization dictionaries and loaded locales.
 *
 * @alpha
 */
export const globalRegistry: Registry = new GlobalRegistry();
