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
import { configure, loc, TestLocalizer, UninitializedLocalizer } from '@localizer/core';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react';

import { SpyOnUseLocalizer } from '../components/__test__/spy-on-use-localizer.js';
import { LocalizationContext } from '../components/localization-context.js';
import { LocalizerContext } from '../localizer-context.js';
import { ReactIntegration } from '../options.js';

const currentLocale = loc((locale) => `${locale}`);

describe('LocalizationContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('uses localizer from context', () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    render(
      <LocalizationContext locale="en-US">
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(useLocalizer[0]?.localize(currentLocale)).toEqual('en-US');
    expect(useLocalizer[0]?.localizeArray([currentLocale])).toEqual(['en-US']);
    expect(useLocalizer[0]?.localizeObject({ currentLocale })).toEqual({
      currentLocale: 'en-US',
    });

    act(() => {
      useLocalizer[0]?.setActiveLocale('fr-FR');
    });

    expect(useLocalizer[0]?.localize(currentLocale)).toEqual('fr-FR');
    expect(useLocalizer[0]?.localizeArray([currentLocale])).toEqual(['fr-FR']);
    expect(useLocalizer[0]?.localizeObject({ currentLocale })).toEqual({
      currentLocale: 'fr-FR',
    });
  });

  it('uses configured default localizer', () => {
    const useLocalizer: [instance?: LocalizerContext] = [];

    //--- use TestLocalizer
    configure(ReactIntegration, {
      defaultLocalizer: TestLocalizer,
    });
    render(<SpyOnUseLocalizer useLocalizer={useLocalizer} />);

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
    configure(ReactIntegration, {
      defaultLocalizer: UninitializedLocalizer,
    });
    render(<SpyOnUseLocalizer useLocalizer={useLocalizer} />);
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
