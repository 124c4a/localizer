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
import { LocaleCode, Localizable } from '@localizer/all';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const { demo } = defineProps<{
  demo: (
    now: Date,
    then: Date,
  ) => {
    formatter: (...args: unknown[]) => Localizable;
    inputs: unknown[][];
    locales: LocaleCode[];
  };
}>();

const now = ref(new Date());
const then = new Date();

let intervalId: number;
onMounted(() => {
  intervalId = +setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => clearInterval(intervalId));

const data = computed(() => demo(now.value, then));
</script>

<template>
  <table tabindex="0" v-if="data.locales.length === 0">
    <thead>
      <tr>
        <th>Input value</th>
        <th>Formatted value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(input, index) in data.inputs" :key="index">
        <td>
          <code>
            {{ input[0] }}
          </code>
        </td>
        <td>
          {{ data.formatter(...input.slice(1)).localize('en') }}
        </td>
      </tr>
    </tbody>
  </table>
  <table tabindex="0" v-else>
    <thead>
      <tr>
        <th></th>
        <th v-for="input in data.inputs">
          <code>{{ input[0] }}</code>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="locale in data.locales">
        <th>
          {{ locale.replace('-', '\u2011') }}
        </th>
        <td v-for="input in data.inputs">
          {{ data.formatter(...input.slice(1)).localize(locale) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
