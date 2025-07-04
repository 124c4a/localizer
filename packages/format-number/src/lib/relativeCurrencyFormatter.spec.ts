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
import { relativeCurrencyFormatter } from './relativeCurrencyFormatter.js';

describe('relativeCurrencyFormatter', () => {
  it('formats the difference between two values as currency for a given locale', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('+$50.00');
  });

  it('returns a negative currency value when the reference is greater than the value', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('-$50.00');
  });

  it('returns zero currency value when the value equals the reference', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('$0.00');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativeCurrencyFormatter('USD', {
      minimumFractionDigits: 3,
    });
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('+$50.000');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativeCurrencyFormatter('USD');
    const result = formatter(12345678901234567880n, 12345678901234567890n).localize('en-US');
    expect(result).toBe('+$10.00');
  });
});
