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
import { ImplicitLocalizer, UninitializedLocalizer } from './localizers.js';

const localizable = loc((loc) => loc);

describe('UninitializedLocalizer', () => {
  it('should throw error when used', () => {
    expect(() => UninitializedLocalizer(localizable)).toThrow(TypeError);
  });
});

describe('ImplicitLocalizer', () => {
  it('throws an error when implicit localization is disabled', () => {
    coreOptions.activeLocale = undefined;
    expect(() => `${localizable}`).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.',
      ),
    );
    expect(() => ImplicitLocalizer(localizable)).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.',
      ),
    );
  });

  it('returns the active locale when implicit localization is enabled and active locale is set', () => {
    coreOptions.activeLocale = 'en';
    expect(`${localizable}`).toBe('en');
    expect(ImplicitLocalizer(localizable)).toBe('en');
  });

  it('returns the active locale when implicit localization is enabled via setActiveLocale', () => {
    setActiveLocale('fi');
    expect(ImplicitLocalizer(localizable)).toBe('fi');
  });
});
