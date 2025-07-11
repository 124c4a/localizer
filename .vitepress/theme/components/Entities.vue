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
  import { entities } from '../data/entities';
  import { NSpace } from 'naive-ui/es/space';
  import { useData } from 'vitepress';
  import Entity from './Entity.vue';

  const { pkg, type, configurable } = defineProps<{
    pkg?: string;
    type?: 'number' | 'date' | 'string' | 'other' | 'constant' | 'transformer';
    configurable?: boolean;
  }>();

  const { frontmatter } = useData();

  const filteredList = computed(() => {
    if (frontmatter && frontmatter.value['entity'] && frontmatter.value['entity']['name']) {
      const relatedEntities =
        entities.find((entity) => entity.name === frontmatter.value['entity']['name'])?.related ??
        [];
      return entities
        .filter((entity) => relatedEntities.includes(entity.name))
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return entities
        .filter((entity) => {
          return (
            (!pkg || entity.pkg === pkg) &&
            (!type || entity.type === type) &&
            (!configurable || entity.configurable === configurable)
          );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  });
</script>

<template>
  <template v-if="filteredList.length > 0">
    <slot></slot>
    <NSpace vertical :size="18">
      <Entity v-for="entity in filteredList" :key="entity.name" :name="entity.name" />
    </NSpace>
  </template>
</template>
