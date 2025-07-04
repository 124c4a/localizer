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
import { relativeUnitFormatter } from './relativeUnitFormatter.js';

describe('relativeUnitFormatter', () => {
  it('formats the relative difference between two values with a unit for a given locale', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(100, 150).localize('en-US');
    expect(result).toBe('+50 km');
  });

  it('returns a negative value with a unit when the reference is greater than the value', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(150, 100).localize('en-US');
    expect(result).toBe('-50 km');
  });

  it('returns zero with a unit when the value equals the reference', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(100, 100).localize('en-US');
    expect(result).toBe('0 km');
  });

  it('applies custom number format options if provided', () => {
    const formatter = relativeUnitFormatter('kilometer', {
      minimumFractionDigits: 2,
    });
    const result = formatter(100, 150.1).localize('en-US');
    expect(result).toBe('+50.10 km');
  });

  it('handles bigint values correctly', () => {
    const formatter = relativeUnitFormatter('kilometer');
    const result = formatter(12345678901234567880n, 12345678901234567890n).localize('en-US');
    expect(result).toBe('+10 km');
  });
});
