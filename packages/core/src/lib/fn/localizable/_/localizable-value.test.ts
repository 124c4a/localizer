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
import { coreOptions } from '../../locale/options.js';
import { LocalizableValue } from './localizable-value.js';

describe('LocalizableValue', () => {
  it('returns localized value for a valid locale', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.localize('en-US')).toBe('value for en-US');
  });

  it('returns default value when locale is an empty array', () => {
    coreOptions.activeLocale = 'en';

    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString([])).toBe('value for en');
  });

  it('returns localized value for the first locale in an array', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString(['fr', 'de'])).toBe('value for fr');
  });

  it('handles Symbol.toPrimitive correctly', () => {
    coreOptions.activeLocale = 'en';

    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(`${value}`).toBe('value for en');
  });

  it('returns localized value for a valid locale in toLocaleString', () => {
    const value = new LocalizableValue((locale) => `value for ${locale}`);
    expect(value.toLocaleString('en-US')).toBe('value for en-US');
  });
});
