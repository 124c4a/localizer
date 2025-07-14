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
/// <reference types="vite/client" />
import type { Theme } from 'vitepress';

import { setup } from '@css-render/vue3-ssr';
import localizerPlugin from '@localizer/x-vue';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { GlobalThemeOverrides, NConfigProvider } from 'naive-ui/es/config-provider';
import { darkTheme } from 'naive-ui/es/themes/dark';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import '@shikijs/vitepress-twoslash/style.css';
import { defineComponent, h, inject, InjectionKey, onMounted, ref, watch } from 'vue';

import './style.css';
import Card from './components/Card.vue';
import Cards from './components/Cards.vue';
import Deprecated from './components/Deprecated.vue';
import Entities from './components/Entities.vue';
import Entity from './components/Entity.vue';
import EntityDemo from './components/EntityDemo.vue';
import Experimental from './components/Experimental.vue';
import OptionsDemo from './components/OptionsDemo.vue';
import Package from './components/Package.vue';
import Packages from './components/Packages.vue';
import Preview from './components/Preview.vue';

const { Layout } = DefaultTheme;

const Collect = Symbol.for('css-render-collect') as InjectionKey<() => string>;

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject(Collect, () => '');
    return {
      style: collect(),
    };
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    });
  },
});

const NaiveUIProvider = defineComponent({
  setup() {
    const { isDark } = useData();
    const isDarkTheme = ref(false);

    // Dirty hack to make sure the theme is reactive
    // This is necessary because `isDark` is not reactive in the SSR context
    watch(isDark, (newValue) => {
      isDarkTheme.value = newValue;
    });
    onMounted(() => {
      isDarkTheme.value = isDark.value;
    });

    return {
      isDark: isDarkTheme,
    };
  },
  render() {
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        infoColor: this.isDark ? '#a8b1ff' : '#3451b2',
      },
    };

    return h(
      NConfigProvider,
      {
        abstract: true,
        inlineThemeDisabled: true,
        preflightStyleDisabled: true,
        theme: this.isDark ? darkTheme : undefined,
        themeOverrides,
      },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? h(CssRenderStyle) : null,
        ],
      },
    );
  },
});

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    app.use(TwoslashFloatingVue);
    app.use(localizerPlugin, { initialLocale: 'en-US' });
    app.component('Package', Package);
    app.component('Packages', Packages);
    app.component('Experimental', Experimental);
    app.component('Preview', Preview);
    app.component('Deprecated', Deprecated);
    app.component('Entity', Entity);
    app.component('EntityDemo', EntityDemo);
    app.component('Entities', Entities);
    app.component('OptionsDemo', OptionsDemo);
    app.component('Card', Card);
    app.component('Cards', Cards);
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide(Collect, collect);
    }
  },
} satisfies Theme;
