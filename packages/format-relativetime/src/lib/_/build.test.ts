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
import { upperCase } from '@localizer/transform';

import { _buildFormatter } from './build.js';

describe('_buildFormatter', () => {
  it('formats relative time correctly for a given locale', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02'),
    ).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02'),
    ).localize(null);
    expect(result).toBe('2023-01-01T00:00:00.000Z +1 day');
  });

  it('applies transform function if provided', () => {
    const formatter = _buildFormatter({
      numeric: 'auto',
      transform: [upperCase],
    });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02'),
    ).localize('en-US');
    expect(result).toBe('TOMORROW');
  });

  it('handles past relative times correctly', () => {
    const formatter = _buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-02'),
      new Date('2023-01-01'),
    ).localize('en-US');
    expect(result).toBe('yesterday');
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
    expect(result).toBe('in 2 hours');
  });
});
