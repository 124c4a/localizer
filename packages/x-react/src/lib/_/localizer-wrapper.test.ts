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
import { getLocalizer, loc } from '@localizer/core';

import { LocalizerWrapper } from './localizer-wrapper.js';

const currentLocale = loc((locale) => `${locale}`);

describe('LocalizerWrapper', () => {
  const localizer = getLocalizer('en-US');

  const mockSetActiveLocale = vi.fn();
  const wrapper = new LocalizerWrapper(localizer, mockSetActiveLocale);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return localized value using localize method', () => {
    const result = wrapper.localize(currentLocale);
    expect(result).toBe('en-US');
  });

  it('should return localized array using localizeArray method', () => {
    const values = [currentLocale, currentLocale];
    const result = wrapper.localizeArray(values);
    expect(result).toEqual(['en-US', 'en-US']);
  });

  it('should return localized object using localizeObject method', () => {
    const values = { key1: currentLocale, key2: currentLocale };
    const result = wrapper.localizeObject(values);
    expect(result).toEqual({ key1: 'en-US', key2: 'en-US' });
  });

  it('should get the active locale', () => {
    expect(wrapper.activeLocale).toBe('en-US');
  });

  it('should set the active locale', async () => {
    wrapper.setActiveLocale('fr-FR');
    expect(mockSetActiveLocale).toHaveBeenCalledWith('fr-FR');
  });
});
