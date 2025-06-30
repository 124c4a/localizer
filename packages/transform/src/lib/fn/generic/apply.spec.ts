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

import { transform } from '../transform.js';
import { apply } from './apply.js';

describe('apply', () => {
  it('applies the function to the localized value', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = transform(value, [apply((v) => v.toUpperCase())]);
    expect(result.localize('en')).toBe('VALUE FOR EN');
  });

  it('returns a new Localizable instance', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = transform(value, [apply((v) => v.toUpperCase())]);
    expect(result).not.toBe(value);
  });

  it('applies the function correctly for different locales', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = transform(value, [
      apply((v) => v.replace('value', 'transformed')),
    ]);
    expect(result.localize('en')).toBe('transformed for en');
    expect(result.localize('fi')).toBe('transformed for fi');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = transform(value, [apply((v) => v + ' transformed')]);
    expect(result.localize('en')).toBe(' transformed');
  });
});
