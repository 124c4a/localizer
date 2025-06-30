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

import { dateTimeFormatter } from './dateTimeFormatter.js';

describe('dateTimeFormatter', () => {
  it('formats a date correctly for a given locale', () => {
    const formatter = dateTimeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('January 1, 2023');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = dateTimeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize(null);
    expect(result).toBe('2023-01-01T00:00:00.000Z');
  });

  it('filters parts based on options if provided', () => {
    const formatter = dateTimeFormatter({ year: 'numeric', parts: ['year'] });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('2023');
  });

  it('applies transform function if provided', () => {
    const formatter = dateTimeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      transform: [upperCase],
    });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('JANUARY 1, 2023');
  });
});
