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
import {
  configure,
  getLocalizer,
  TestLocalizer,
  UninitializedLocalizer,
  loc,
} from '@localizer/core';
import { mount } from '@vue/test-utils';

import { _localizationContextSymbol } from '../fn/_/internal-context.js';
import { VueIntegration } from '../options.js';
import { Localized } from './localized.js';

const currentLocale = loc((locale) => `${locale}`);

describe('Localized', () => {
  it('uses localizer from context', () => {
    const wrapper = mount(<Localized content={currentLocale} />, {
      global: {
        provide: {
          [_localizationContextSymbol]: {
            localizer: getLocalizer('en-US'),
            setLocale: () => {
              return;
            },
          },
        },
      },
    });

    expect(wrapper.html()).toContain('en-US');
  });

  it('uses Empty if content is not provided', () => {
    const wrapper = mount(<Localized />, {
      global: {
        provide: {
          [_localizationContextSymbol]: {
            localizer: getLocalizer('en-US'),
            setLocale: () => {
              return;
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('');
  });

  it('uses configured default localizer', () => {
    //--- use TestLocalizer
    configure(VueIntegration, {
      defaultLocalizer: TestLocalizer,
    });
    const wrapper = mount(<Localized content={currentLocale} />);
    expect(wrapper.html()).toContain('null');

    //--- use UninitializedLocalizer
    configure(VueIntegration, {
      defaultLocalizer: UninitializedLocalizer,
    });
    expect(() => mount(<Localized content={currentLocale} />)).toThrowError(
      'Attempt to use Localizer before locale was set',
    );
  });
});
