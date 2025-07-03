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
import { coreOptions, setActiveLocale } from '../fn/locale/options.js';
import { loc } from '../fn/localizable/loc.js';
import { ImplicitLocalizer, TestLocalizer } from './localizers.js';

const localizable = loc((loc) => loc);

describe('ImplicitLocalizer', () => {
  it('throws an error when implicit localization is disabled', () => {
    coreOptions.activeLocale = undefined;
    expect(() => `${localizable}`).toThrow(
      new RangeError('Implicit localization requires an active locale to be set.'),
    );
    expect(() => ImplicitLocalizer(localizable)).toThrow(
      new RangeError('Implicit localization requires an active locale to be set.'),
    );
  });

  it('uses the active locale when implicit localization is enabled and active locale is set', () => {
    coreOptions.activeLocale = 'en';
    expect(`${localizable}`).toBe('en');
    expect(ImplicitLocalizer(localizable)).toBe('en');
  });

  it('uses the active locale when implicit localization is enabled via setActiveLocale', () => {
    setActiveLocale('fi');
    expect(ImplicitLocalizer(localizable)).toBe('fi');
  });

  it('localizes function using the active locale when implicit localization is enabled and active locale is set', () => {
    coreOptions.activeLocale = 'en';

    const fn = (value: number) => loc((locale) => `Value: ${value} (${locale})`);

    expect(ImplicitLocalizer(fn)(5)).toBe('Value: 5 (en)');
  });

  it('returns current active locale', () => {
    coreOptions.activeLocale = 'en';
    expect(ImplicitLocalizer.locale).toBe('en');
  });
});

describe('TestLocalizer', () => {
  it('passes `null` as a locale to localizable', () => {
    expect(TestLocalizer(localizable)).toBe(null);
  });

  it('passes `null` as a locale to localizable function', () => {
    coreOptions.activeLocale = 'en';

    const fn = (value: number) => loc((locale) => `Value: ${value} (${locale})`);

    expect(TestLocalizer(fn)(5)).toBe('Value: 5 (null)');
  });

  it('returns current `null` locale', () => {
    expect(TestLocalizer.locale).toBe(null);
  });
});
