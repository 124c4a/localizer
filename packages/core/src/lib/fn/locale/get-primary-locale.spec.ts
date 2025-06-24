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
import { getPrimaryLocale } from './get-primary-locale.js';

describe('getPrimaryLocale', () => {
  it('returns the same locale when no country is present', () => {
    expect(getPrimaryLocale('en')).toBe('en');
  });

  it('returns the primary locale for a country when available', () => {
    expect(getPrimaryLocale('sv-FI')).toBe('fi-FI');
  });

  it('returns the same locale when no primary locale is defined for the country', () => {
    expect(getPrimaryLocale('fi-FI')).toBe('fi-FI');
  });
});
