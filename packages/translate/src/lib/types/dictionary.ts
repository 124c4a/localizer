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
import { LocaleCode, Localizable, ValueFormatter } from '@localizer/core';

/**
 * Represents a dictionary that provides localization functionality for a specific set of keys.
 *
 * @template K - The type of keys used in the dictionary.
 *
 * @alpha
 */
export interface Dictionary<K> {
  /**
   * Loads the localization data for a specific locale.
   *
   * @param   locale - The locale code to load localization data for.
   *
   * @returns        A promise that resolves when the locale data has been loaded.
   *
   * @alpha
   */
  loadLocale(locale: LocaleCode): Promise<void>;

  /**
   * Retrieves a localizable value associated with the specified key.
   *
   * @param   key - The key to retrieve the localizable value for.
   *
   * @returns     A `Localizable` object representing the localized value.
   *
   * @alpha
   */
  key(key: K): Localizable;

  /**
   * Retrieves a value formatter for a key that requires parameters.
   *
   * @param   key           - The key to retrieve the value formatter for.
   * @param   hasParameters - A flag indicating that the key requires parameters.
   *
   * @returns               A `ValueFormatter` object for formatting the localized value with
   *   parameters.
   *
   * @alpha
   */
  key<T extends Record<string, unknown>>(key: K, hasParameters: true): ValueFormatter<T>;
}

/**
 * Represents a mapping where each key of type `K` corresponds to an object. This object maps locale
 * codes (`LocaleCode`) to values of type `V`. The value for a specific locale can be undefined if
 * no value is provided for that locale.
 *
 * @template K - A string type representing the keys of the structure.
 * @template V - The type of the values associated with each locale.
 *
 * @alpha
 */
export type FlatStructure<K extends string, V> = {
  [key in K]: {
    [locale in LocaleCode]?: V;
  };
};

/**
 * Represents a partial structure where keys are of type `K` and values are of type `V`. This type
 * is a utility that creates a partial mapping of keys to values, allowing some or all keys to be
 * omitted.
 *
 * @template K - A string literal type representing the keys of the structure.
 * @template V - The type of the values associated with the keys.
 */
export type SplitStructurePartial<K extends string, V> = Partial<Record<K, V>>;

/**
 * Represents a structure for organizing translations or data split by locale.
 *
 * @template K - The type of the keys used in the structure.
 * @template V - The type of the values associated with the keys.
 *
 * @alpha
 */
export type SplitStructure<K extends string, V> = {
  [locale in LocaleCode]?: SplitStructurePartial<K, V>;
};

/**
 * Represents a dictionary structure that can be loaded asynchronously or synchronously.
 *
 * @template K - A string type representing the keys of the dictionary.
 * @template V - The type of the values associated with the keys in the dictionary.
 *
 * @property [locale] - An optional property where the key is a `LocaleCode` and the value can
 *   either be a `SplitStructurePartial<K, V>` or a `Promise` resolving to `SplitStructurePartial<K,
 *   V>`.
 */
export type LoadableDictionary<K extends string, V> = {
  [locale in LocaleCode]?: SplitStructurePartial<K, V> | Promise<SplitStructurePartial<K, V>>;
};
