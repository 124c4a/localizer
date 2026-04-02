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
import { getLocalizer, LocaleCode, Localizer } from '@localizer/core';
import { provide, shallowRef } from 'vue';

import { _getInitialLocale } from './get-initial-locale.js';
import { InternalContext, _localizationContextSymbol } from './internal-context.js';

/**
 * Creates a localization context for the specified initial locale. This function initializes a
 * localizer based on the provided locale code or automatically determines the initial locale if not
 * specified.
 *
 * @param   initialLocale - The initial locale code to use for the context. If not provided, the
 *   initial locale will be determined automatically.
 * @param   consumer      - An optional consumer function that will be called with the created
 *   context instead of using `provide`.
 *
 * @returns               The created localization context.
 */
export function _provideContext(
  initialLocale?: LocaleCode,
  consumer?: typeof provide,
): InternalContext {
  const initialLocaleCode = initialLocale ?? _getInitialLocale();

  const innerLocalizer = shallowRef(getLocalizer(initialLocaleCode));

  const fn = (localizable: Parameters<Localizer>[0]): ReturnType<Localizer> => {
    return innerLocalizer.value(localizable as Parameters<Localizer>[0]) as ReturnType<Localizer>;
  };

  Object.defineProperty(fn, 'locale', {
    get() {
      return innerLocalizer.value.locale;
    },
  });

  const context: InternalContext = {
    localizer: fn as Localizer,
    setActiveLocale: (locale: LocaleCode) => {
      innerLocalizer.value = getLocalizer(locale);
    },
  };

  if (consumer) {
    consumer(_localizationContextSymbol, context);
  } else {
    provide(_localizationContextSymbol, context);
  }
  return context;
}
