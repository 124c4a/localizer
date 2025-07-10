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
import { LocaleCode, getLocalizer } from '@localizer/core';
import { CurrentLanguage } from '@localizer/format';
import { describe, it, expect, vi } from 'vitest';

import { LocalizerWrapper } from './localizer-wrapper.js';

describe('LocalizerWrapper', () => {
  const localizer = getLocalizer('en-US');

  const mockSetActiveLocale = vi.fn();
  const wrapper = new LocalizerWrapper({ localizer, setActiveLocale: mockSetActiveLocale });

  it('should return localized value using localize method', () => {
    const result = wrapper.localize(CurrentLanguage);
    expect(result).toBe('American English');
  });

  it('should return localized array using localizeArray method', () => {
    const values = [CurrentLanguage, CurrentLanguage];
    const result = wrapper.localizeArray(values);
    expect(result).toEqual(['American English', 'American English']);
  });

  it('should return localized object using localizeObject method', () => {
    const values = { key1: CurrentLanguage, key2: CurrentLanguage };
    const result = wrapper.localizeObject(values);
    expect(result).toEqual({ key1: 'American English', key2: 'American English' });
  });

  it('should get the active locale', () => {
    expect(wrapper.activeLocale).toBe('en-US');
  });

  it('should set the active locale', () => {
    wrapper.activeLocale = 'fr-FR' as LocaleCode;
    expect(mockSetActiveLocale).toHaveBeenCalledWith('fr-FR');
  });
});
