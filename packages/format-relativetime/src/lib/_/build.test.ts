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
import { _buildFormatter } from './build.js';

describe('_buildFormatter', () => {
  it('formats relative time correctly for a given locale', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result = formatter(new Date('2023-01-01'), new Date('2023-01-02')).localize('en-US');
    expect(result).toBe('yesterday');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result1 = formatter(new Date('2023-01-01'), new Date('2023-01-02')).localize(null);
    const result2 = formatter(new Date('2023-01-02'), new Date('2023-01-01')).localize(null);
    expect(result1).toBe('{"reference":"2023-01-02T00:00:00.000Z","diff":-1,"unit":"day"}');
    expect(result2).toBe('{"reference":"2023-01-01T00:00:00.000Z","diff":1,"unit":"day"}');
  });

  it('handles past relative times correctly', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result = formatter(new Date('2023-01-02'), new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('handles custom stops for relative time calculation', () => {
    const formatter = _buildFormatter({
      numeric: 'auto',
      stops: ['day', 'hour'],
    });
    const result = formatter(
      new Date('2023-01-01T12:12:00'),
      new Date('2023-01-01T15:00:00'),
    ).localize('en-US');
    expect(result).toBe('2 hours ago');
  });
});
