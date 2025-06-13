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

import { capitalize } from './capitalize.js';

describe('capitalize', () => {
  it('capitalizes the first character of a localized string', () => {
    const value = loc(() => 'example');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Example');
  });

  it('handles strings with already capitalized first characters', () => {
    const value = loc(() => 'Example');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Example');
  });

  it('capitalizes the first character of strings with special characters', () => {
    const value = loc(() => 'äxample');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Äxample');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('');
  });

  it('capitalizes strings correctly for different locales', () => {
    const value = loc`istanbul`;
    const result = capitalize(value);
    expect(result.localize('tr')).toBe('İstanbul');
    expect(result.localize('en')).toBe('Istanbul');
  });
});
