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
import { loc } from '@localizer/core';
import { upperCase } from '@localizer/transform';

import { listFormatter } from './listFormatter.js';

describe('listFormatter', () => {
  it('formats a list with a custom delimiter for a given locale', () => {
    const formatter = listFormatter({ delimiter: loc`, ` });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US',
    );
    expect(result).toBe('apple, banana, cherry');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = listFormatter({ delimiter: loc`, ` });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      null,
    );
    expect(result).toBe('[list]');
  });

  it('applies a transform function to the formatted list', () => {
    const formatter = listFormatter({
      delimiter: loc`, `,
      transform: [upperCase],
    });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US',
    );
    expect(result).toBe('APPLE, BANANA, CHERRY');
  });

  it('formats a list using Intl.ListFormat for a given locale', () => {
    const formatter = listFormatter({ style: 'long', type: 'conjunction' });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US',
    );
    expect(result).toBe('apple, banana, and cherry');
  });

  it('formats a list using Intl.ListFormat for a given locale and applies transformation', () => {
    const formatter = listFormatter({
      style: 'long',
      type: 'conjunction',
      transform: [upperCase],
    });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US',
    );
    expect(result).toBe('APPLE, BANANA, AND CHERRY');
  });

  it('returns a placeholder when formatting list using Intl.ListFormat for an undefined locale', () => {
    const formatter = listFormatter({ style: 'long', type: 'conjunction' });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      null,
    );
    expect(result).toBe('[list]');
  });

  it('handles empty lists correctly', () => {
    const formatter = listFormatter({ style: 'long', type: 'conjunction' });
    const result = formatter([]).localize('en-US');
    expect(result).toBe('');
  });
});
