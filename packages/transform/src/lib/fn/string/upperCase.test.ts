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

import { upperCase } from './upperCase.js';

describe('upperCase', () => {
  it('converts a localized string to upper case', () => {
    const value = loc(() => 'example');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('EXAMPLE');
  });

  it('handles strings with mixed case characters', () => {
    const value = loc(() => 'ExAmPlE');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('EXAMPLE');
  });

  it('handles strings with special characters', () => {
    const value = loc(() => 'äxample');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('ÄXAMPLE');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('');
  });

  it('converts strings correctly for different locales', () => {
    const value = loc`istanbul`;
    const result = upperCase(value);
    expect(result.localize('tr')).toBe('İSTANBUL');
    expect(result.localize('en')).toBe('ISTANBUL');
    expect(result.localize(null)).toBe('istanbul');
  });
});
