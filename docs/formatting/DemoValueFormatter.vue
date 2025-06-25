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
import { LocaleCode, Localizable, stringify } from '@localizer/all';

defineProps<{
  demo: {
    formatter: (...args: unknown[]) => Localizable;
    inputs: unknown[][];
    locales: LocaleCode[];
  };
}>();
</script>

<template>
  <table tabindex="0">
    <thead>
      <tr>
        <th>Input</th>
        <th v-for="locale in demo.locales">{{ locale }}</th>
        <th v-if="demo.locales.length === 0">Formatted value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(input, index) in demo.inputs" :key="index">
        <td>
          <code>
            {{ input[0] }}
          </code>
        </td>
        <td v-for="locale in demo.locales" :key="locale">
          {{ demo.formatter(...input.slice(1)).localize(locale) }}
        </td>
        <td v-if="demo.locales.length === 0">
          {{ demo.formatter(...input.slice(1)).localize('en') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
