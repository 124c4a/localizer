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
import { configure } from '../configure.js';
import { getLocaleChain } from './getLocaleChain.js';
import { Core } from './options.js';

describe('getLocaleChain', () => {
  it('returns the locale and fallback locales when no region is present', () => {
    expect(getLocaleChain('fi')).toEqual(['fi', 'en']);
  });

  it('returns the locale, base language, and fallback locales when region is present', () => {
    expect(getLocaleChain('fi-FI')).toEqual(['fi-FI', 'fi', 'en']);
  });

  it('caches the result for subsequent calls with the same locale', () => {
    const result1 = getLocaleChain('fr-CA');
    const result2 = getLocaleChain('fr-CA');
    expect(result1).toBe(result2);
  });

  it('returns the locale and fallback locales when no region is present and fallback locale is configured', () => {
    configure({ Core }, { Core: { fallbackLocales: ['en'] } });
    expect(getLocaleChain('fi')).toEqual(['fi', 'en']);
  });
});
