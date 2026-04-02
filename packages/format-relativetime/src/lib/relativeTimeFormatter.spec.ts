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
import { relativeTimeFormatter } from './relativeTimeFormatter.js';

describe('relativeTimeFormatter', () => {
  it('returns a formatter that formats relative time correctly with default options', () => {
    const formatter = relativeTimeFormatter();
    const result = formatter(new Date('2023-01-02'), new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('yesterday');
  });

  it('returns a formatter that applies custom options correctly', () => {
    const formatter = relativeTimeFormatter({ numeric: 'auto' });
    const result = formatter(new Date('2023-01-01'), new Date('2023-01-02')).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('handles undefined options by falling back to default behavior', () => {
    const formatter = relativeTimeFormatter();
    const result = formatter(new Date('2023-01-02'), new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('yesterday');
  });

  it('handles edge cases where both dates are the same', () => {
    const formatter = relativeTimeFormatter();
    const result = formatter(new Date('2023-01-01'), new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('this minute');
  });
});
