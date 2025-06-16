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

import { usePrimaryLocale } from './usePrimaryLocale.js';

describe('usePrimaryLocale', () => {
  it('returns a localized value for the primary locale', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = usePrimaryLocale(value);
    expect(result.localize('en-FI')).toBe('value for fi-FI');
  });

  it('propagates undefined locale as is', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = usePrimaryLocale(value);
    expect(result.localize(null)).toBe('value for null');
  });

  it('handles null localized value gracefully', () => {
    const value = loc(() => null);
    const result = usePrimaryLocale(value);
    expect(result.localize('en')).toBe(null);
  });

  it('returns a new Localizable instance', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = usePrimaryLocale(value);
    expect(result).not.toBe(value);
  });
});
