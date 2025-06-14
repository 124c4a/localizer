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
import { loc } from '../localizable/loc.js';
import { getLocalizer } from './getLocalizer.js';

describe('getLocalizer', () => {
  it('should localize', () => {
    const localizer = getLocalizer('en');
    const localizable = loc((locale) => locale);
    expect(localizer(localizable)).toBe('en');
  });
  it('returns a function that localizes dynamic values', () => {
    const localizer = getLocalizer('en');
    const dynamicLocalizable = (value: string) =>
      loc(() => `localized ${value}`);
    const localizedFn = localizer(dynamicLocalizable);
    expect(localizedFn('test')).toBe('localized test');
  });

  it('returns the locale when accessing the locale property', () => {
    const localizer = getLocalizer('en');
    expect(localizer.locale).toBe('en');
  });
});
