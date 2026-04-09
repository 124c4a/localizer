/*
 * Copyright 2026 Artem Godin.
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
import { relativePercentFormatter } from './relativePercentFormatter.js';

describe('relativePercentFormatter', () => {
  it('formats the relative percentage difference between two numbers correctly for a given locale', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('+50%');
  });

  it('returns negative percentage when the value is less than the reference', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(100, 50).localize('en-US');
    expect(result).toBe('-50%');
  });

  it('returns zero percentage when the value equals the reference', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('0%');
  });

  it('returns zero percentage when both value and reference are zero', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(0, 0).localize('en-US');
    expect(result).toBe('0%');
  });

  it('returns positive infinity percentage when the reference is zero and value is positive', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(0, 100).localize('en-US');
    expect(result).toBe('+∞%');
  });

  it('returns negative infinity percentage when the reference is zero and value is negative', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(0, -100).localize('en-US');
    expect(result).toBe('-∞%');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativePercentFormatter({ minimumFractionDigits: 2 });
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('+50.00%');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativePercentFormatter();
    const result = formatter(12345678901234567880n, 12345678901234567890n).localize('en-US');
    expect(result).toBe('0%');
  });
});
