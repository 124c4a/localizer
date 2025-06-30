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
import { fixedUnitFormatter } from './fixedUnitFormatter.js';

describe('fixedUnitFormatter', () => {
  it('formats a number with a unit correctly for a given locale', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(100).localize('en-US');
    expect(result).toBe('100 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(100).localize(null);
    expect(result).toBe('100 kilometer');
  });

  it('handles bigint values correctly', () => {
    const formatter = fixedUnitFormatter('kilometer');
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('12,345,678,901,234,567,890 km');
  });

  it('applies custom number format options if provided', () => {
    const formatter = fixedUnitFormatter('kilometer', {
      minimumFractionDigits: 2,
    });
    const result = formatter(100).localize('en-US');
    expect(result).toBe('100.00 km');
  });
});
