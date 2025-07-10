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
import { getLocalizer } from '@localizer/core';
import { inject } from 'vue';

import { _vueIntegrationOptions } from '../../options.js';
import { _localizationContextSymbol, LocalizationContext } from './context.js';
import { _injectContext } from './inject-context.js';

vi.mock('vue', () => ({
  inject: vi.fn(),
}));

describe('_injectContext', () => {
  it('should return the injected localization context if available', () => {
    const mockContext: LocalizationContext = {
      localizer: getLocalizer('en'),
      setActiveLocale: vi.fn(),
    };
    vi.mocked(inject).mockReturnValue(mockContext);

    const result = _injectContext();

    expect(inject).toHaveBeenCalledWith(_localizationContextSymbol, expect.any(Function), true);
    expect(result).toBe(mockContext);
  });

  it('should return the default context if no context is injected', () => {
    vi.mocked(inject).mockImplementation(((
      key: unknown,
      defaultValue: () => Readonly<LocalizationContext>,
    ) => defaultValue()) as never);

    const result = _injectContext();

    expect(inject).toHaveBeenCalledWith(_localizationContextSymbol, expect.any(Function), true);
    expect(result.localizer).toBe(_vueIntegrationOptions.defaultLocalizer);
    expect(() => result.setActiveLocale('fr')).toThrowError(
      'Attempt to set locale without a localizer. Did you use `localizerPlugin` or `LocalizationContext`?',
    );
  });
});
