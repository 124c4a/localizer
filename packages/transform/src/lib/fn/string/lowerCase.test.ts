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
import { loc } from '@localizer/core';

import { lowerCase } from './lowerCase.js';

describe('lowerCase', () => {
  it('converts a localized string to lower case', () => {
    const value = loc(() => 'EXAMPLE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('example');
  });

  it('handles strings with mixed case characters', () => {
    const value = loc(() => 'ExAmPlE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('example');
  });

  it('handles strings with special characters', () => {
    const value = loc(() => 'ÄxAmPlE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('äxample');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('');
  });

  it('converts strings correctly for different locales', () => {
    const value = loc((locale) => (locale === 'tr' ? 'İSTANBUL' : 'ISTANBUL'));
    const result = lowerCase(value);
    expect(result.localize('tr')).toBe('istanbul');
    expect(result.localize('en')).toBe('istanbul');
    expect(result.localize(null)).toBe('ISTANBUL');
  });
});
