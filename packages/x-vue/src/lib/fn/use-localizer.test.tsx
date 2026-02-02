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
import {
  configure,
  getLocalizer,
  loc,
  TestLocalizer,
  UninitializedLocalizer,
} from '@localizer/core';
import { mount } from '@vue/test-utils';

import { SpyOnUseLocalizer } from '../components/__test__/spy-on-use-localizer.jsx';
import { LocalizerContext } from '../localizer-context.js';
import { VueIntegration } from '../options.js';
import { _localizationContextSymbol } from './_/internal-context.js';

const currentLocale = loc((locale) => `${locale}`);

describe('useLocalize', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('uses localizer from context', () => {
    const contextLocalizer = getLocalizer('en-US');
    const mockSetActiveLocale = vi.fn();

    const useLocalizer: [instance?: LocalizerContext] = [];
    mount(<SpyOnUseLocalizer useLocalizer={useLocalizer} />, {
      global: {
        provide: {
          [_localizationContextSymbol]: {
            localizer: contextLocalizer,
            setActiveLocale: mockSetActiveLocale,
          },
        },
      },
    });

    useLocalizer[0]?.setActiveLocale('fr-FR');

    expect(useLocalizer[0]?.localize).toBe(contextLocalizer);
    expect(useLocalizer[0]?.localize(currentLocale)).toEqual('en-US');
    expect(useLocalizer[0]?.localizeArray([currentLocale])).toEqual(['en-US']);
    expect(useLocalizer[0]?.localizeObject({ currentLocale })).toEqual({
      currentLocale: 'en-US',
    });
    expect(mockSetActiveLocale).toHaveBeenCalledWith('fr-FR');
  });

  it('uses configured default localizer', () => {
    const useLocalizer: [instance?: LocalizerContext] = [];

    //--- use TestLocalizer
    configure(VueIntegration, {
      defaultLocalizer: TestLocalizer,
    });
    mount(<SpyOnUseLocalizer useLocalizer={useLocalizer} />);

    expect(useLocalizer[0]?.localize).toBe(TestLocalizer);
    expect(useLocalizer[0]?.localize(currentLocale)).toEqual('null');
    expect(useLocalizer[0]?.localizeArray([currentLocale])).toEqual(['null']);
    expect(useLocalizer[0]?.localizeObject({ currentLocale })).toEqual({
      currentLocale: 'null',
    });
    expect(useLocalizer[0]?.activeLocale).toBeNull();
    expect(() => useLocalizer[0]?.setActiveLocale('fr-FR')).toThrowError(
      'Attempt to set locale without a localizer. Did you use `localizerPlugin` or `LocalizationContext`?',
    );

    //--- use UninitializedLocalizer
    configure(VueIntegration, {
      defaultLocalizer: UninitializedLocalizer,
    });
    mount(<SpyOnUseLocalizer useLocalizer={useLocalizer} />);
    expect(useLocalizer[0]?.localize).toBe(UninitializedLocalizer);
    expect(() => useLocalizer[0]?.localize(currentLocale)).toThrowError(
      'Attempt to use Localizer before locale was set',
    );
    expect(() => {
      useLocalizer[0]?.localizeArray([currentLocale]);
    }).toThrowError('Attempt to use Localizer before locale was set');
    expect(() => {
      useLocalizer[0]?.localizeObject({ currentLocale });
    }).toThrowError('Attempt to use Localizer before locale was set');
    expect(useLocalizer[0]?.activeLocale).toBeUndefined();
    expect(() => useLocalizer[0]?.setActiveLocale('fr-FR')).toThrowError(
      'Attempt to set locale without a localizer. Did you use `localizerPlugin` or `LocalizationContext`?',
    );
  });
});
