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
  import { getLocalizer, loc } from '@localizer/core';
  import { NCard } from 'naive-ui/es/card';
  import { NTag } from 'naive-ui/es/tag';
  import { NTooltip } from 'naive-ui/es/tooltip';
  import { NIcon } from 'naive-ui/es/icon';
  import { NSpace } from 'naive-ui/es/space';
  import { NText, NH1 } from 'naive-ui/es/typography';
  import { VPLink } from 'vitepress/theme';
  import { SettingsSharp } from '@vicons/ionicons5';
  import { entities } from '../data/entities';
  import { Entity } from '../entity';

  const localizer = getLocalizer('en-US');

  const types = {
    number: 'info',
    date: 'success',
    string: 'warning',
    other: 'default',
    constant: 'error',
    transformer: 'error',
  } as const;

  const description = {
    number: 'Formatter for numbers',
    date: 'Formatter for dates and times',
    string: 'Formatter for strings or enumerations',
    other: 'Formatter for other types',
    constant: 'Constant value',
    transformer: 'Transformer for localizable values',
  } as const;

  const { name } = defineProps<{
    name: string;
  }>();

  const entity = computed(() => {
    return entities.find((f) => f.name === name) as Entity;
  });
</script>

<template>
  <NCard :segmented="{ footer: 'soft' }">
    <template #header>
      <NSpace size="small">
        <VPLink :href="entity.docs">
          {{ entity.name }}
        </VPLink>
        <NTooltip :trigger="'hover'" :placement="'top'" v-if="entity.configurable">
          <template #trigger>
            <NIcon :component="SettingsSharp" style="vertical-align: text-bottom" />
          </template>
          Configurable
        </NTooltip>
      </NSpace>
    </template>
    <template #header-extra>
      <NSpace size="small">
        <Experimental v-if="entity.maturity === 'alpha'" />
        <Preview v-if="entity.maturity === 'beta'" />
        <span class="hide-on-mobile">
          <Package :name="entity.pkg" />
        </span>
      </NSpace>
    </template>
    <NH1>
      <NSpace :size="entity.type === 'constant' ? 0 : 'small'">
        <NText depth="3" v-if="entity.type === 'constant'">`</NText>
        <NText v-if="entity.type === 'transformer' && entity.argument">{{
          localizer(entity.argument)
        }}</NText>
        <NText depth="3" v-if="entity.type === 'transformer' && entity.argument">→</NText>
        <NText :type="types[entity.type]">{{ localizer(entity.example) }}</NText>
        <NText depth="3" v-if="entity.type === 'constant'">`</NText>
      </NSpace>
    </NH1>
    <NText>{{ entity.summary }}</NText>
  </NCard>
</template>
