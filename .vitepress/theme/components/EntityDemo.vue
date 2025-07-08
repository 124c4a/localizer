<!--
Copyright 2025 Artem Godin.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<script setup lang="ts">
  import { computed } from 'vue';
  import { loc, LocaleCode } from '@localizer/core';
  import { entities } from '../data/entities';
  import { Entity } from '../entity';
  import { NFlex } from 'naive-ui/es/flex';
  import { NForm } from 'naive-ui/es/form';
  import { languageName, stringify } from '@localizer/format';
  import { useData } from 'vitepress';

  const locales: LocaleCode[] = ['en-US', 'fr-FR', 'de-DE', 'fi-FI', 'sv-FI', 'ko-KR', 'hi-IN'];

  const { args } = defineProps<{
    args: any[];
  }>();

  const { frontmatter } = useData();

  const entity = computed(() => {
    return entities.find((f) => f.name === frontmatter.value['entity']['name']) as Entity;
  });

  const fn = computed(() => {
    return (...args: any[]) => {
      try {
        return entity.value.fn(...args);
      } catch (error) {
        console.error(error);
        return loc`Invalid arguments: ${stringify(error)}`;
      }
    };
  });
</script>

<template>
  <NFlex vertical :singleLine="true">
    <NForm label-placement="left" label-width="200">
      <slot></slot>
    </NForm>
    <table>
      <thead>
        <tr>
          <th>Locale</th>
          <th style="width: 100%">Localized value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(locale, index) in locales" :key="index">
          <td style="white-space: nowrap">
            <code> {{ locale }} </code>
            {{ languageName(locale).localize('en-US') }}
          </td>
          <td>
            {{ fn(...args).localize(locale) }}
          </td>
        </tr>
      </tbody>
    </table>
  </NFlex>
</template>
