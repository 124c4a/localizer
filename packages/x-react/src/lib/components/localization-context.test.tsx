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
import { loc } from '@localizer/core';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react';

import { LocalizerContext } from '../localizer-context.js';
import { SpyOnUseLocalizer } from './__test__/spy-on-use-localizer.js';
import { LocalizationContext } from './localization-context.js';
import { Localized } from './localized.js';

const currentLocale = loc((locale) => `${locale}`);

describe('LocalizationContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders with initial locale', () => {
    const wrapper = render(
      <LocalizationContext locale="en-US">
        <Localized content={currentLocale} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en-US');
  });

  it('renders without children', () => {
    const wrapper = render(<LocalizationContext locale="en-US" />);

    expect(wrapper.baseElement.innerHTML).toBe('<div></div>');
  });

  it('renders with default locale if not specified', () => {
    const wrapper = render(
      <LocalizationContext>
        <Localized content={currentLocale} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en');
  });

  it('reacts to locale change', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const wrapper = render(
      <LocalizationContext>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en');

    act(() => {
      useLocalizer[0]?.setActiveLocale('fr-FR');
    });

    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');
  });

  it('reacts to locale change via property', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const wrapper = render(
      <LocalizationContext>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en');

    wrapper.rerender(
      <LocalizationContext locale="fr-FR">
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');
  });

  it('emits update:locale when locale changes', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const handler = vi.fn();
    render(
      <LocalizationContext onUpdateLocale={handler}>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    act(() => {
      useLocalizer[0]?.setActiveLocale('fr-FR');
    });

    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith('fr-FR');
  });

  it('does not emit update:locale when locale does not change', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const handler = vi.fn();
    render(
      <LocalizationContext locale="fr-FR" onUpdateLocale={handler}>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    act(() => {
      useLocalizer[0]?.setActiveLocale('fr-FR');
    });

    expect(handler).not.toBeCalled();
  });

  it('does not emit update:locale when locale is changed via property', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const handler = vi.fn();
    const wrapper = render(
      <LocalizationContext onUpdateLocale={handler}>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    wrapper.rerender(
      <LocalizationContext onUpdateLocale={handler} locale="fr-FR">
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );

    expect(handler).not.toBeCalled();
  });

  it('does not change locale when property updated to undefined', async () => {
    const useLocalizer: [instance?: LocalizerContext] = [];
    const handler = vi.fn();
    const wrapper = render(
      <LocalizationContext onUpdateLocale={handler}>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );
    expect(wrapper.baseElement.innerHTML).toContain('en');

    wrapper.rerender(
      <LocalizationContext onUpdateLocale={handler} locale="fr-FR">
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );
    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');

    wrapper.rerender(
      <LocalizationContext onUpdateLocale={handler}>
        <Localized content={currentLocale} />
        <SpyOnUseLocalizer useLocalizer={useLocalizer} />
      </LocalizationContext>,
    );
    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');

    expect(handler).not.toBeCalled();
  });

  it('can be nested', async () => {
    const useLocalizerOuter: [instance?: LocalizerContext] = [];
    const useLocalizerInner: [instance?: LocalizerContext] = [];

    const wrapper = render(
      <LocalizationContext locale="en-US">
        <SpyOnUseLocalizer useLocalizer={useLocalizerOuter} />
        <Localized content={currentLocale} />
        <LocalizationContext locale="fr-FR">
          <SpyOnUseLocalizer useLocalizer={useLocalizerInner} />
          <Localized content={currentLocale} />
        </LocalizationContext>
      </LocalizationContext>,
    );

    expect(wrapper.baseElement.innerHTML).toContain('en-US');
    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');

    act(() => {
      useLocalizerOuter[0]?.setActiveLocale('fi-FI');
    });

    expect(wrapper.baseElement.innerHTML).toContain('fi-FI');
    expect(wrapper.baseElement.innerHTML).toContain('fr-FR');

    act(() => {
      useLocalizerInner[0]?.setActiveLocale('sv-FI');
    });

    expect(wrapper.baseElement.innerHTML).toContain('fi-FI');
    expect(wrapper.baseElement.innerHTML).toContain('sv-FI');
  });
});
