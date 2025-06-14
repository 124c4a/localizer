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
import { coreOptions } from '../locale/options.js';
import { ensureImplicitLocalization } from './ensureImplicitLocalization.js';

describe('ensureImplicitLocalization', () => {
  it('throws an error when implicit localization is disabled', () => {
    coreOptions.implicitLocalization = false;
    coreOptions.activeLocale = 'en';
    expect(() => ensureImplicitLocalization()).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.'
      )
    );
  });

  it('throws an error when active locale is undefined', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = undefined;
    expect(() => ensureImplicitLocalization()).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.'
      )
    );
  });

  it('returns the active locale when implicit localization is enabled and active locale is set', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = 'en';
    expect(ensureImplicitLocalization()).toBe('en');
  });
});
