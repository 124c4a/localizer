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
import { currencyFormatter } from './currencyFormatter.js';

describe('currencyFormatter', () => {
  it('formats a number as currency for a given locale', () => {
    const formatter = currencyFormatter();
    const result = formatter(1234.56, 'USD').localize('en-US');
    expect(result).toBe('$1,234.56');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = currencyFormatter();
    const result = formatter(1234.56, 'USD').localize(null);
    expect(result).toBe('[currency]');
  });

  it('handles bigint values correctly', () => {
    const formatter = currencyFormatter();
    const result = formatter(12345678901234567890n, 'EUR').localize('en-US');
    expect(result).toBe('€12,345,678,901,234,567,890.00');
  });
});
