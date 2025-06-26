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
import { readFileSync } from 'node:fs';
import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import { SidebarItem } from 'vitepress-sidebar/types';

function patchSidebar(entry: SidebarItem): SidebarItem {
  if (entry.link && entry.link.startsWith('/tmp/')) {
    entry.link = entry.link.replace('/tmp/', '/');
  }
  if (entry.text && entry.text.startsWith('@localizer/')) {
    entry.text = entry.text.replace('@localizer/', '');
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
  title: '@localizer',
  description: 'Type-safe localization, formatting and translation library',
  base: '/localizer/',
  srcDir: 'docs',
  markdown: {},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting started', link: '/introduction/getting-started' },
      { text: 'API reference', link: '/api' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/124c4a/localizer' },
    ],

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
};

const configWithSidebar = withSidebar(config, {
  // ============ [ RESOLVING PATHS ] ============
  documentRootPath: 'docs',
  // scanStartPath: null,
  // resolvePath: null,
  // basePath: null,
  //
  // ============ [ GROUPING ] ============
  collapsed: true,
  // collapseDepth: 2,
  // rootGroupText: 'Contents',
  // rootGroupLink: 'https://github.com/jooy2',
  // rootGroupCollapsed: false,
  //
  // ============ [ GETTING MENU TITLE ] ============
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
  // frontmatterTitleFieldName: 'title',
  //
  // ============ [ GETTING MENU LINK ] ============
  useFolderLinkFromSameNameSubFile: true,
  // useFolderLinkFromIndexFile: false,
  // folderLinkNotIncludesFileName: true,
  //
  // ============ [ INCLUDE / EXCLUDE ] ============
  excludePattern: ['api'],
  // excludeFilesByFrontmatterFieldName: 'exclude',
  // includeDotFiles: false,
  // includeEmptyFolder: false,
  // includeRootIndexFile: false,
  // includeFolderIndexFile: false,
  //
  // ============ [ STYLING MENU TITLE ] ============
  hyphenToSpace: true,
  // underscoreToSpace: false,
  capitalizeFirst: true,
  // capitalizeEachWords: false,
  // keepMarkdownSyntaxFromTitle: false,
  // removePrefixAfterOrdering: false,
  // prefixSeparator: '.',
  //
  // ============ [ SORTING ] ============
  // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
  // sortFolderTo: null,
  // sortMenusByName: false,
  // sortMenusByFileDatePrefix: false,
  sortMenusByFrontmatterOrder: true,
  // frontmatterOrderDefaultValue: 0,
  // sortMenusByFrontmatterDate: true,
  // sortMenusOrderByDescending: false,
  // sortMenusOrderNumericallyFromTitle: false,
  // sortMenusOrderNumericallyFromLink: true,
  //
  // ============ [ MISC ] ============
  // debugPrint: false,
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
