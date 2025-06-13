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

import { plural, one, other } from './plural.js';

describe('plural function', () => {
  it('returns the correct translation for a specific number', () => {
    const map = { 1: 'one', 2: 'two', other: 'other' };
    expect(plural(1, map).localize('en')).toBe('one');
    expect(plural(2, map).localize('en')).toBe('two');
  });

  it('returns the correct translation for plural categories', () => {
    const map = { [one]: 'one', [other]: 'other' };
    expect(plural(0, map).localize('ru')).toBe('other');
    expect(plural(1, map).localize('ru')).toBe('one');
    expect(plural(2, map).localize('ru')).toBe('other');
    expect(plural(5, map).localize('ru')).toBe('other');
  });

  it('throws an error if no "other" category is defined', () => {
    const map = { [one]: 'one' };
    expect(() => plural(5, map).localize('en')).toThrow(
      new RangeError(`No 'other' plural category defined`)
    );
  });

  it('handles function-based translations', () => {
    const pluralFn = (value: number) =>
      plural(value, {
        [one]: `one (${value})`,
        [other]: `other (${value})`,
      });

    expect(pluralFn(1).localize('en')).toBe('one (1)');
    expect(pluralFn(2).localize('en')).toBe('other (2)');
    expect(pluralFn(5).localize('en')).toBe('other (5)');
  });

  it('handles Localizable objects in the map', () => {
    const currentLocaleCode = loc((locale) => `localized (${locale})`);
    const map = { [one]: currentLocaleCode, [other]: 'other' };
    expect(plural(1, map).localize('en')).toBe('localized (en)');
    expect(plural(5, map).localize('en')).toBe('other');
  });

  it('handles undefined values gracefully when "other" is defined', () => {
    const map = { [other]: 'fallback' };
    expect(plural(999, map).localize('en')).toBe('fallback');
  });
});
