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
  import { packages } from '../data/packages';

  const { name } = defineProps<{
    name: string;
  }>();
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NTag round type="info" :bordered="false"
        >{{ packages[name].name }} <NText>{{ packages[name].version }}</NText></NTag
      >
    </template>
    {{ packages[name].description }}
  </NTooltip>
</template>
