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

import { LocalizerInstance } from '../../localizer-instance.js';
import { LocalizationContext } from './context.js';

/**
 * Wrapper class for the reactive Localizer instance used in Vue.js applications. This class
 * provides methods to localize values and manage the active locale.
 *
 * @internal
 */
export class LocalizerWrapper implements LocalizerInstance {
  readonly localize: Localizer;
  private readonly _setActiveLocale: (locale: LocaleCode) => void;

  constructor(context: LocalizationContext) {
    this.localize = context.localizer;
    this._setActiveLocale = context.setActiveLocale;
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

  set activeLocale(locale: LocaleCode) {
    this._setActiveLocale(locale);
  }
}
