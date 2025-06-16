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
import { fixedCurrencyRangeFormatter } from './fixedCurrencyRangeFormatter.js';

describe('fixedCurrencyRangeFormatter', () => {
  it('formats a range of numbers as currency for a given locale', () => {
    const formatter = fixedCurrencyRangeFormatter('USD');
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('$1,000.00 – $2,000.00');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedCurrencyRangeFormatter('USD');
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[currencyRange]');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedCurrencyRangeFormatter('EUR');
    const result = formatter(
      12345678901234567890n,
      22345678901234567890n
    ).localize('en-US');
    expect(result).toBe(
      '€12,345,678,901,234,567,890.00 – €22,345,678,901,234,567,890.00'
    );
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedCurrencyRangeFormatter('USD', {
      minimumFractionDigits: 4,
    });
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('$1,000.0000 – $2,000.0000');
  });
});
