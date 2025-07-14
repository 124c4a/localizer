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
import { Localized, LocaleCode, Localizer, localizeArray, localizeObject } from '@localizer/core';

import { LocalizerContext } from '../localizer-context.js';

/**
 * Wrapper class for the Localizer instance used in React applications. This class provides methods
 * to localize values and manage the active locale.
 *
 * @internal
 */
export class LocalizerWrapper implements LocalizerContext {
  readonly localize: Localizer;
  private readonly _setActiveLocale: (locale: LocaleCode) => void;

  constructor(localizer: Localizer, setActiveLocale: (locale: LocaleCode) => void) {
    this.localize = localizer;
    this._setActiveLocale = setActiveLocale;
  }

  localizeArray<T extends unknown[]>(values: T): Localized<T> {
    if (this.localize.locale === undefined) {
      throw new Error('Attempt to use Localizer before locale was set');
    }
    return localizeArray(values, this.localize.locale);
  }
  localizeObject<T extends Record<string, unknown>>(values: T): Localized<T> {
    if (this.localize.locale === undefined) {
      throw new Error('Attempt to use Localizer before locale was set');
    }
    return localizeObject(values, this.localize.locale);
  }

  get activeLocale(): LocaleCode {
    return this.localize.locale;
  }

  setActiveLocale(locale: LocaleCode) {
    this._setActiveLocale(locale);
  }
}
