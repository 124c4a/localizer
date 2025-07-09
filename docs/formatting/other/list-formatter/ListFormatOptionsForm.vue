<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInput } from 'naive-ui/es/input';
  import { NSelect } from 'naive-ui/es/select';
  import { loc, Localizable } from '@localizer/core';
  import { ListFormatOptions } from '@localizer/format-list';

  const { initial } = defineProps<{
    initial: ListFormatOptions;
  }>();

  const emit = defineEmits<{
    options: [value: ListFormatOptions];
    config: [value: string];
  }>();

  const options = ref<any>(initial || {});

  const numbers = /^\d+$/;

  const finalOptions = computed(() => {
    const result: ListFormatOptions = {};

    if (!!options.value.delimiter) {
      (result as { delimiter: Localizable }).delimiter = loc(() => options.value.delimiter);
    } else {
      Object.entries(options.value).forEach(([key, value]) => {
        if (value != null) {
          if (numbers.test(value as string)) {
            result[key] = Number(value);
          } else if (Array.isArray(value)) {
            if (value.length > 0) {
              result[key] = value;
            }
          } else {
            result[key] = value;
          }
        }
      });
    }

    return result;
  });

  const prettyOptions = computed(() => {
    const result: string[] = [];
    result.push('{');
    if (!!options.value.delimiter) {
      result.push(`  delimiter: loc\`${options.value.delimiter}\`,`);
    } else {
      Object.entries(finalOptions.value).forEach(([key, value]) => {
        if (value != null) {
          if (numbers.test(value as string)) {
            result.push(`  ${key}: ${value},`);
          } else if (Array.isArray(value)) {
            if (value.length > 0) {
              result.push(`  ${key}: [${value.map((it) => `'${it}'`).join(', ')}],`);
            }
          } else {
            result.push(`  ${key}: '${value}',`);
          }
        }
      });
    }
    result.push('}');
    return result.join('\n');
  });

  watch(
    prettyOptions,
    () => {
      emit('config', prettyOptions.value);
    },
    { immediate: true },
  );

  watch(
    finalOptions,
    () => {
      emit('options', finalOptions.value);
    },
    { immediate: true },
  );

  const opts = (arr, notClearable = false) =>
    notClearable
      ? arr.map((item) => ({ label: String(item), value: item }))
      : [
          { label: '─── unset ───', value: null },
          ...arr.map((item) => ({ label: String(item), value: item })),
        ];
</script>

<template>
  <NFormItem label="type"
    ><NSelect
      clearable
      v-model:value="options.type"
      :options="opts(['conjunction', 'disjunction', 'unit'])"
      placeholder="─── unset ───"
      :disabled="!!options.delimiter"
  /></NFormItem>
  <NFormItem label="style"
    ><NSelect
      clearable
      v-model:value="options.style"
      :options="opts(['long', 'short', 'narrow'])"
      placeholder="─── unset ───"
      :disabled="!!options.delimiter"
  /></NFormItem>
  <NFormItem label="delimiter"
    ><NInput clearable v-model:value="options.delimiter" type="text" placeholder="─── unset ───"
  /></NFormItem>
</template>
