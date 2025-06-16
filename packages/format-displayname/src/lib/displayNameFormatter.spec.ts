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
import { upperCase } from '@localizer/transform';

import { displayNameFormatter } from './displayNameFormatter.js';

describe('displayNameFormatter', () => {
  it('formats a value using the provided locale and options', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result = formatter('US').localize('en-US');
    expect(result).toBe('United States');
  });

  it('returns a fallback value for unknown codes', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result = formatter('ZL').localize('en-US');
    expect(result).toBe('ZL');
  });

  it('returns an empty string value for unknown codes if fallback is set as `none`', () => {
    const formatter = displayNameFormatter({
      type: 'region',
      fallback: 'none',
    });
    const result = formatter('ZL').localize('en-US');
    expect(result).toBe('');
  });

  it('returns a placeholder when locale is undefined', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result = formatter('US').localize(null);
    expect(result).toBe('[region]');
  });

  it('applies a custom transform function if provided', () => {
    const formatter = displayNameFormatter({
      type: 'region',
      transform: [upperCase],
    });
    const result = formatter('US').localize('en-US');
    expect(result).toBe('UNITED STATES');
  });

  it('handles multiple locales with caching', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result1 = formatter('US').localize('en-US');
    const result2 = formatter('US').localize('fr-FR');
    expect(result1).toBe('United States');
    expect(result2).toBe('États-Unis');
  });
});
