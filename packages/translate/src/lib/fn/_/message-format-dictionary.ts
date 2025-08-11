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
import {
  getLocaleChain,
  loc,
  LocaleCode,
  Localizable,
  parseLocaleCode,
  ValueFormatter,
} from '@localizer/core';
import { MessageFormat } from 'messageformat';
import { DraftFunctions } from 'messageformat/functions';

import { LoadableDictionary, SplitStructure } from '../../types/dictionary.js';
import { Dictionary } from '../../types/dictionary.js';
import { _getMessageValueProxy } from './get-message-value-proxy.js';
import { _isPromise } from './is-promise.js';

export class MessageFormatDictionary implements Dictionary<string> {
  private readonly _loadedData: SplitStructure<string, string> = {};
  private readonly _compiled: Map<
    string,
    Map<LocaleCode, [LocaleCode, MessageFormat<string, string>]>
  > = new Map();
  private readonly _loaders: {
    [locale in LocaleCode]?: Promise<void>;
  } = {};
  private readonly _id: string;

  constructor(id: string, data: LoadableDictionary<string, string>) {
    this._id = id;
    Object.entries(data).forEach(([locale, value]) => {
      if (value === undefined) {
        return;
      }
      if (_isPromise(value)) {
        this._loaders[locale as LocaleCode] = value.then((data) => {
          this._loadedData[locale as LocaleCode] = data;
        });
      } else {
        this._loadedData[locale as LocaleCode] = value;
      }
    });
  }

  async loadLocale(locale: LocaleCode): Promise<void> {
    const loaders = getLocaleChain(locale)
      .filter((it) => it in this._loaders && !(it in this._loadedData))
      .map((it) => this._loaders[it]);
    await Promise.all(loaders);
  }

  key(key: string): Localizable;
  key<T extends Record<string, unknown>>(key: string, hasParameters: true): ValueFormatter<T>;
  key<T extends Record<string, unknown> | never = never>(
    key: string,
    hasParameters?: boolean,
  ): Localizable | ValueFormatter<T> {
    if (hasParameters) {
      return (value: T) => {
        return loc((locale) => {
          if (locale === null) {
            return `${this._id}.${key}`;
          } else {
            const [actualLocale, messageFormat] = this._getMessageFormat(key, locale);
            return messageFormat.format(_getMessageValueProxy(value, actualLocale));
          }
        });
      };
    } else {
      return loc((locale) => {
        if (locale === null) {
          return `${this._id}.${key}`;
        } else {
          const [, messageFormat] = this._getMessageFormat(key, locale);
          return messageFormat.format();
        }
      });
    }
  }

  private _getMessageFormat(
    key: string,
    locale: LocaleCode,
  ): [LocaleCode, MessageFormat<string, string>] {
    if (!this._compiled.has(key)) {
      this._compiled.set(key, new Map());
    }

    const localeMap = this._compiled.get(key);

    if (!localeMap.has(locale)) {
      let data = undefined;
      let foundLocale: LocaleCode | undefined = undefined;
      for (const l of getLocaleChain(locale)) {
        if (this._loadedData[l]?.[key] !== undefined) {
          data = this._loadedData[l][key];
          foundLocale = l as LocaleCode;
          break;
        }
      }
      if (data === undefined || foundLocale === undefined) {
        throw new Error(
          `Key "${key}" not found for locale "${locale}" or any of it's fallback locales. Please ensure the dictionary is loaded correctly.`,
        );
      }
      const [, originalCountry] = parseLocaleCode(locale);
      const [foundLanguage] = parseLocaleCode(foundLocale);

      const actualLocale: LocaleCode = originalCountry
        ? `${foundLanguage}-${originalCountry}`
        : foundLocale;

      localeMap.set(locale, [
        actualLocale,
        new MessageFormat<string, string>(actualLocale, data, { functions: DraftFunctions }),
      ]);
    }

    return localeMap.get(locale);
  }
}
