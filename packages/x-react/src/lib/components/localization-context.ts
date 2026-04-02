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
import { getLocalizer, LocaleCode } from '@localizer/core';
import { createElement, useEffect, useState } from 'react';

import { Context } from '../_/context.js';
import { _getInitialLocale } from '../_/get-initial-locale.js';
import { LocalizerWrapper } from '../_/localizer-wrapper.js';

/**
 * Props for the LocalizationProvider component.
 *
 * @alpha
 */
export type LocalizationContextProps = {
  /**
   * The locale to set for the localizer. This is optional and will default to the configured
   * fallback language if not provided.
   *
   * @alpha
   */
  locale?: LocaleCode;
  /**
   * This event is emitted when the locale is changed via context.
   *
   * @param   locale - The new locale to set for the localizer.
   *
   * @returns
   */
  onUpdateLocale?: (locale: LocaleCode) => void;
  /**
   * The children to render within the context provider.
   *
   * @internal
   */
  children?: React.ReactNode;
};

/**
 * Component for providing localization context in Vue applications. This component initializes a
 * localizer based on the provided initial locale or automatically determines the initial locale if
 * not specified. It also emits an event when the locale changes.
 *
 * @alpha
 */
export function LocalizationContext({
  locale,
  onUpdateLocale,
  children,
}: LocalizationContextProps) {
  const [wrapper, setWrapper] = useState<LocalizerWrapper>(() => {
    const setActiveLocale = (newLocale: LocaleCode) => {
      if (wrapper.activeLocale !== newLocale) {
        setWrapper((prev) => new LocalizerWrapper(getLocalizer(newLocale), prev.setActiveLocale));
        onUpdateLocale?.(newLocale);
      }
    };

    return new LocalizerWrapper(getLocalizer(locale ?? _getInitialLocale()), setActiveLocale);
  });

  useEffect(() => {
    if (locale !== undefined && locale !== wrapper.activeLocale) {
      setWrapper((prev) => new LocalizerWrapper(getLocalizer(locale), prev.setActiveLocale));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return createElement(Context.Provider, { value: wrapper }, children);
}
