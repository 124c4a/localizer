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
import { LocaleCode, Localizer } from '@localizer/core';
import { InjectionKey } from 'vue';

/**
 * Context for localization in Vue applications.
 *
 * @internal
 */
export type LocalizationContext = {
  /** The localizer instance used for localization. */
  localizer: Localizer;
  /**
   * Sets the current locale.
   *
   * @param   locale The locale to set.
   *
   * @returns        Void
   */
  setActiveLocale: (locale: LocaleCode) => void;
};

/**
 * Injection key for the localization context in Vue applications.
 *
 * @internal
 */
export const _localizationContextSymbol = Symbol() as InjectionKey<LocalizationContext>;
