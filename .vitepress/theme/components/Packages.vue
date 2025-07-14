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
  import { NTooltip } from 'naive-ui/es/tooltip';
  import { NTag } from 'naive-ui/es/tag';
  import { NText } from 'naive-ui/es/typography';
  import Package from './Package.vue';
  import { packages } from '../data/packages';

  const { names } = defineProps<{
    names: string[];
  }>();
</script>

<template>
  <Package :name="names[0]" />&#x202F;
  <NTooltip trigger="hover" v-if="names.length > 1">
    <template #trigger>
      <NTag round type="default" :bordered="true" style="vertical-align: text-bottom"
        >+ {{ names.length - 1 }}</NTag
      >
    </template>
    <ul>
      <li v-for="name in names.slice(1)" :key="name">
        {{ packages[name].name }} {{ packages[name].version }}
      </li>
    </ul>
  </NTooltip>
</template>
