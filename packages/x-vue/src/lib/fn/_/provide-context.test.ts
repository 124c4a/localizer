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
import { provide, shallowRef } from 'vue';

import { _localizationContextSymbol } from './context.js';
import { _provideContext } from './provide-context.js';

vi.mock('vue', () => ({
  provide: vi.fn(),
  shallowRef: vi.fn((obj) => ({ value: obj })),
}));

describe('_provideContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should provide the correct context', () => {
    const context = _provideContext('fr');
    expect(provide).toHaveBeenCalledWith(expect.anything(), context);
  });

  it('should set the initial locale', () => {
    const context = _provideContext('fr');
    expect(context.localizer.locale).toBe('fr');
  });

  it('should use the default locale if no initial locale is provided', () => {
    const context = _provideContext();
    expect(context.localizer.locale).toBe('en'); // Assuming 'en' is the default locale
  });

  it('should provide a reactive context', () => {
    _provideContext('fr');
    expect(shallowRef).toHaveBeenCalled();
  });

  it('should update the locale when setLocale is called', () => {
    const context = _provideContext('fr');
    expect(context.localizer.locale).toBe('fr');
    context.setActiveLocale('de');
    expect(context.localizer.locale).toBe('de');
  });

  it('should use the supplied consumer function', () => {
    const mockConsumer = vi.fn();
    const context = _provideContext('fr', mockConsumer);
    expect(mockConsumer).toHaveBeenCalledWith(_localizationContextSymbol, context);
    expect(provide).toBeCalledTimes(0);
  });
});
