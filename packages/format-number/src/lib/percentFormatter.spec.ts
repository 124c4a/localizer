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
import { percentFormatter } from './percentFormatter.js';

describe('percentFormatter', () => {
  it('formats a number as a percentage for a given locale', () => {
    const formatter = percentFormatter();
    const result = formatter(0.1234).localize('en-US');
    expect(result).toBe('12%');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = percentFormatter();
    const result = formatter(0.1234).localize(null);
    expect(result).toBe('{"value":12.34,"unit":"%"}');
  });

  it('applies custom number format options if provided', () => {
    const formatter = percentFormatter({ minimumFractionDigits: 2 });
    const result = formatter(0.1234).localize('en-US');
    expect(result).toBe('12.34%');
  });

  it('handles bigint values correctly', () => {
    const formatter = percentFormatter();
    const result = formatter(12345678901234567890n).localize('en-US');
    expect(result).toBe('1,234,567,890,123,456,789,000%');
  });
});
