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
import { LocaleCode } from '@localizer/core';
import { defineComponent, watch } from 'vue';

import { _provideContext } from '../fn/_/provide-context.js';

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
};

/**
 * Emits for the LocalizationProvider component.
 *
 * @alpha
 */
export type LocalizationContextEmits = {
  /**
   * This event is emitted when the locale is changed via context.
   *
   * @param   locale - The new locale to set for the localizer.
   *
   * @returns
   */
  'update:locale': (locale: LocaleCode) => void;
};

/**
 * Component for providing localization context in Vue applications. This component initializes a
 * localizer based on the provided initial locale or automatically determines the initial locale if
 * not specified. It also emits an event when the locale changes.
 *
 * @alpha
 */
export const LocalizationContext = /*#__PURE__*/ defineComponent<
  LocalizationContextProps,
  LocalizationContextEmits
>(
  (props, { slots, emit }) => {
    const context = _provideContext(props.locale);

    watch(
      () => props.locale,
      (newLocale) => {
        if (newLocale === undefined || newLocale === context.localizer.locale) {
          return;
        }
        context.setActiveLocale(newLocale);
      },
    );

    watch(
      () => context.localizer.locale,
      (newLocale) => {
        if (newLocale === props.locale) {
          return;
        }
        emit('update:locale', newLocale);
      },
    );

    return () => slots.default?.();
  },
  {
    name: 'x-localization-context',
    props: ['locale'],
    emits: { 'update:locale': (locale: LocaleCode) => typeof locale === 'string' },
  },
);
