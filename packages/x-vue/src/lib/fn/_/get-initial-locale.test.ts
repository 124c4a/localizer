/*
 * Copyright 2026 Artem Godin.
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
import { getLocaleChain, LocaleCode } from '@localizer/core';

import { _getInitialLocale } from './get-initial-locale.js';

vi.mock('@localizer/core', () => ({
  getLocaleChain: vi.fn(),
}));

describe('_getInitialLocale', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the first valid locale from the locale chain', () => {
    vi.mocked(getLocaleChain).mockReturnValue(['und', 'fr', 'en'] as LocaleCode[]);
    const result = _getInitialLocale();
    expect(result).toBe('fr');
  });

  it('should skip "und" and return the next valid locale', () => {
    vi.mocked(getLocaleChain).mockReturnValue(['und', 'es', 'en'] as LocaleCode[]);
    const result = _getInitialLocale();
    expect(result).toBe('es');
  });

  it('should default to "en" if no valid locale is found', () => {
    vi.mocked(getLocaleChain).mockReturnValue(['und'] as unknown as LocaleCode[]);
    const result = _getInitialLocale();
    expect(result).toBe('en');
  });

  it('should default to "en" if the locale chain is empty', () => {
    vi.mocked(getLocaleChain).mockReturnValue([]);
    const result = _getInitialLocale();
    expect(result).toBe('en');
  });
});
