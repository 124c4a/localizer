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

import { ReactIntegration } from '../options.js';
import { LocalizationContext } from './localization-context.js';
import { Localized } from './localized.js';

const currentLocale = loc((locale) => `${locale}`);

describe('Localized', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('uses localizer from context', () => {
    const wrapper = render(
      <LocalizationContext locale="en-US">
        <Localized content={currentLocale} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en-US');
  });

  it('uses Empty if content is not provided', () => {
    const wrapper = render(
      <LocalizationContext locale="en-US">
        <Localized />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toBe('<div></div>');
  });

  it('uses configured default localizer', () => {
    //--- use TestLocalizer
    configure(ReactIntegration, {
      defaultLocalizer: TestLocalizer,
    });
    const wrapper = render(<Localized content={currentLocale} />);
    expect(wrapper.baseElement.innerHTML).toContain('null');

    //--- use UninitializedLocalizer
    configure(ReactIntegration, {
      defaultLocalizer: UninitializedLocalizer,
    });
    expect(() => render(<Localized content={currentLocale} />)).toThrowError(
      'Attempt to use Localizer before locale was set',
    );
  });
});
