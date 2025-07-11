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
/* eslint-disable sonarjs/publicly-writable-directories */
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs';
import { readFileSync } from 'node:fs';
import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import { SidebarItem } from 'vitepress-sidebar/types';

function patchSidebar(entry: SidebarItem): SidebarItem {
  if (entry.link && entry.link.startsWith('/tmp/')) {
    entry.link = entry.link.replace('/tmp/', '/');
  }
  if (entry.text) {
    if (entry.text.startsWith('@localizer/')) {
      entry.text = entry.text.replace('@localizer/', '');
    } else if (entry.text === 'Variables') {
      entry.text = 'Constants';
    }
  }

  if (entry.items) {
    entry.items = entry.items.map(patchSidebar);
  }

  return entry;
}

function readApiSidebar() {
  const sidebarFile = readFileSync('docs/api/typedoc-sidebar.json', 'utf-8');
  return JSON.parse(sidebarFile);
}

const config: UserConfig = {
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },
  },
  markdown: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    codeTransformers: [transformerTwoslash({ typesCache: createFileSystemTypesCache() }) as any],
  },
  title: '@localizer',
  description: 'Type-safe localization, formatting and translation library',
  base: '/localizer/',
  srcDir: 'docs',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting started', link: '/introduction/getting-started' },
      { text: 'Translation', link: '/translation' },
      { text: 'Formatting', link: '/formatting' },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/124c4a/localizer' }],
    editLink: {
      pattern: 'https://github.com/124c4a/localizer/edit/main/docs/:path',
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        async _render(src, env, md) {
          if (env.frontmatter?.search === false) return '';
          if (env.relativePath.startsWith('api/')) return '';
          return md.render(src, env);
        },
      },
    },
  },
  transformHtml(code) {
    const styleRegex = /<css-render-style>(.*)<\/css-render-style>/s;
    const style = styleRegex.exec(code)?.[1];

    if (style) {
      return code.replace(styleRegex, '').replace(/<\/head>/, `${style}</head>`);
    } else {
      return code.replace(styleRegex, '');
    }
  },
};

const configWithSidebar = withSidebar(config, {
  documentRootPath: 'docs',
  collapsed: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromSameNameSubFile: true,
  excludePattern: ['api'],
  hyphenToSpace: true,
  capitalizeFirst: false,
  sortMenusByFrontmatterOrder: true,
});

configWithSidebar.themeConfig.sidebar.push(
  patchSidebar({
    text: 'API reference',
    link: '/api/',
    items: readApiSidebar(),
    collapsed: true,
  }),
);

// https://vitepress.dev/reference/site-config
export default defineConfig(configWithSidebar);
