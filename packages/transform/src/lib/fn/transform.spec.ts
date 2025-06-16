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
import { loc, Localizable } from '@localizer/core';

import { transform } from './transform.js';

describe('transform', () => {
  it('applies a single transformer to the value', () => {
    const transformer = (value: Localizable) =>
      loc((locale) => value.localize(locale) + ' transformed');
    const value: Localizable = loc`original`;
    const result = transform(value, [transformer]);
    expect(result.localize('en')).toBe('original transformed');
  });

  it('applies multiple transformers in sequence', () => {
    const transformer1 = (value: Localizable) =>
      loc((locale) => value.localize(locale) + ' step1');
    const transformer2 = (value: Localizable) =>
      loc((locale) => value.localize(locale) + ' step2');
    const value: Localizable = loc`original`;
    const result = transform(value, [transformer1, transformer2]);
    expect(result.localize('en')).toBe('original step1 step2');
  });

  it('returns the original value when no transformers are provided', () => {
    const value: Localizable = loc`original`;
    const result = transform(value, []);
    expect(result.localize('en')).toBe('original');
  });
});
