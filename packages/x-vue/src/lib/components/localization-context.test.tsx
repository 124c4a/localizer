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
import { CurrentLanguage } from '@localizer/format';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { LocalizerInstance } from '../localizer-instance.js';
import { SpyOnUseLocalizer } from './__test__/spy-on-use-localizer.jsx';
import { LocalizationContext } from './localization-context.js';
import { Localized } from './localized.js';

describe('LocalizationContext', () => {
  it('renders with initial locale', () => {
    const wrapper = mount(
      <LocalizationContext initialLocale="en-US">
        <Localized content={CurrentLanguage} />
      </LocalizationContext>,
    );

    expect(wrapper.html()).toContain('American English');
  });

  it('renders with default locale if not specified', () => {
    const wrapper = mount(
      <LocalizationContext>
        <Localized content={CurrentLanguage} />
      </LocalizationContext>,
    );

    expect(wrapper.html()).toContain('English');
  });

  it('reacts to locale change', async () => {
    const useLocalizer: [instance?: LocalizerInstance] = [];
    const wrapper = mount(
      <LocalizationContext>
        <Localized content={CurrentLanguage} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(wrapper.html()).toContain('English');

    if (useLocalizer[0]) {
      useLocalizer[0].activeLocale = 'fr-FR';
    }
    await nextTick();

    expect(wrapper.html()).toContain('français (France)');
  });

  it('emits updateLocale when locale changes', async () => {
    const useLocalizer: [instance?: LocalizerInstance] = [];
    const wrapper = mount(
      <LocalizationContext>
        <Localized content={CurrentLanguage} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    if (useLocalizer[0]) {
      useLocalizer[0].activeLocale = 'fr-FR';
    }
    await nextTick();

    expect(wrapper.emitted('updateLocale')).toBeTruthy();
    expect(wrapper.emitted('updateLocale')).toEqual([['fr-FR']]);
  });

  it('can be nested', async () => {
    const useLocalizerOuter: [instance?: LocalizerInstance] = [];
    const useLocalizerInner: [instance?: LocalizerInstance] = [];

    const wrapper = mount(
      <LocalizationContext initialLocale="en-US">
        <SpyOnUseLocalizer useLocalizer={useLocalizerOuter} />
        <Localized content={CurrentLanguage} />
        <LocalizationContext initialLocale="fr-FR">
          <SpyOnUseLocalizer useLocalizer={useLocalizerInner} />
          <Localized content={CurrentLanguage} />
        </LocalizationContext>
      </LocalizationContext>,
    );

    expect(wrapper.html()).toContain('American English');
    expect(wrapper.html()).toContain('français (France)');

    if (useLocalizerOuter[0]) {
      useLocalizerOuter[0].activeLocale = 'fi-FI';
    }
    await nextTick();

    expect(wrapper.html()).toContain('suomi (Suomi)');
    expect(wrapper.html()).toContain('français (France)');

    if (useLocalizerInner[0]) {
      useLocalizerInner[0].activeLocale = 'sv-FI';
    }
    await nextTick();

    expect(wrapper.html()).toContain('suomi (Suomi)');
    expect(wrapper.html()).toContain('svenska (Finland)');
  });
});
