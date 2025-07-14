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
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { Localized } from './components/localized.js';
import { localizerPlugin } from './localizer-plugin.js';
import { VueIntegration } from './options.js';

const currentLocale = loc((locale) => `${locale}`);

describe('localizerPlugin', () => {
  it('can be used with initialLocale option', () => {
    const wrapper = mount(<Localized content={currentLocale} />, {
      global: {
        plugins: [[localizerPlugin, { initialLocale: 'en-US' }]],
      },
    });

    expect(wrapper.html()).toContain('en-US');
  });

  it('can be used with empty options', () => {
    const wrapper = mount(<Localized content={currentLocale} />, {
      global: {
        plugins: [[localizerPlugin, {}]],
      },
    });

    expect(wrapper.html()).toContain('en');
  });

  it('can be used without options', () => {
    const wrapper = mount(<Localized content={currentLocale} />, {
      global: {
        plugins: [localizerPlugin],
      },
    });

    expect(wrapper.html()).toContain('en');
  });

  it('can be used without global context', () => {
    configure(VueIntegration, {
      defaultLocalizer: TestLocalizer,
    });

    const wrapper = mount(<Localized content={currentLocale} />, {
      global: {
        plugins: [[localizerPlugin, { initialLocale: 'en-US', useGlobalContext: false }]],
      },
    });

    expect(wrapper.html()).toContain('null');

    configure(VueIntegration, {
      defaultLocalizer: UninitializedLocalizer,
    });
  });

  it('registers components globally', () => {
    const templatedComponent = defineComponent({
      setup: () => ({ currentLocale }),
      template:
        '<x-localization-context locale="fi-FI"><x-localized :content="currentLocale" /></x-localization-context>',
    });

    const wrapper = mount(templatedComponent, {
      global: {
        plugins: [[localizerPlugin, { useGlobalContext: false }]],
      },
    });

    expect(wrapper.html()).toContain('fi-FI');
    expect(wrapper.findComponent({ name: 'x-localized' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'x-localization-context' }).exists()).toBe(true);
  });
});
