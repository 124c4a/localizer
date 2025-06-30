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
import { currencyCodeFormatter } from './currencyCodeFormatter.js';

describe('currencyCodeFormatter', () => {
  it('formats a currency symbol correctly for a given locale', () => {
    const formatter = currencyCodeFormatter();
    const result = formatter('USD').localize('en-US');
    expect(result).toBe('$');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = currencyCodeFormatter();
    const result = formatter('USD').localize(null);
    expect(result).toBe('USD');
  });

  it('applies custom number format options if provided', () => {
    const formatter = currencyCodeFormatter({ currencyDisplay: 'code' });
    const result = formatter('USD').localize('en-US');
    expect(result).toBe('USD');
  });

  it('formats currency symbols for non-English locales', () => {
    const formatter = currencyCodeFormatter();
    const result = formatter('EUR').localize('fr-FR');
    expect(result).toBe('€');
  });
});
