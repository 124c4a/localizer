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
import { _buildFormatter, _buildRangeFormatter } from './build.js';

describe('_buildFormatter', () => {
  it('formats a date correctly for a given locale', () => {
    const formatter = _buildFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('January 1, 2023');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = _buildFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize(null);
    expect(result).toBe('"2023-01-01T00:00:00.000Z"');
  });

  it('filters parts based on options if provided', () => {
    const formatter = _buildFormatter({ year: 'numeric', parts: ['year'] });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('2023');
  });
});

describe('buildRangeFormatter', () => {
  it('formats a range of dates correctly for a given locale', () => {
    const formatter = _buildRangeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01'), new Date('2023-12-31')).localize('en-US');
    expect(result).toBe('January 1 – December 31, 2023');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = _buildRangeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01'), new Date('2023-12-31')).localize(null);
    expect(result).toBe('{"start":"2023-01-01T00:00:00.000Z","end":"2023-12-31T00:00:00.000Z"}');
  });

  it('filters parts based on source if provided', () => {
    const formatter = _buildRangeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      parts: ['startRange-month'],
    });
    const result = formatter(new Date('2023-01-01'), new Date('2023-12-31')).localize('en-US');
    expect(result).toBe('January');
  });
});
