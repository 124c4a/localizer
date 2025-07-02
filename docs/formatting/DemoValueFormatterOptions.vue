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
  import { isLocalizable, Localizable } from '@localizer/all';
  import { format } from 'path';
  import { computed, onMounted, onUnmounted, ref } from 'vue';

  const { factory, defaultOptions, inputs, option, values } = defineProps<{
    factory: (options: any & {}) => (...args: unknown[]) => Localizable;
    defaultOptions?: any & {};
    inputs: (now: Date, then: Date) => unknown[][];
    option: string;
    values: unknown[];
  }>();

  const formatters = values.map((value) => factory({ ...(defaultOptions ?? {}), [option]: value }));

  const formatValue = (value: unknown) => {
    if (isLocalizable(value)) {
      return 'loc`' + value.localize(null) + '`';
    }
    switch (typeof value) {
      case 'string':
      case 'number':
        return value.toString();
      default:
        return `${value}`;
    }
  };

  const now = ref(new Date());
  const then = new Date();

  let intervalId: number;
  onMounted(() => {
    intervalId = +setInterval(() => {
      now.value = new Date();
    }, 1000);
  });

  onUnmounted(() => clearInterval(intervalId));

  const data = computed(() => inputs(now.value, then));
</script>

<template>
  <ClientOnly>
    <table tabindex="0">
      <thead>
        <tr>
          <th>
            <code>{{ option }}</code>
          </th>
          <th v-for="input in data">
            <code>{{ input[0] }}</code>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in values">
          <th>
            {{ formatValue(value) }}
          </th>
          <td v-for="input in data">
            {{ formatters[index](...input.slice(1)).localize('en-US') }}
          </td>
        </tr>
      </tbody>
    </table>
  </ClientOnly>
</template>
