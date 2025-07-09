<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { DisplayNameFormatOptions } from '@localizer/format-displayname';

  const { initial } = defineProps<{
    initial: DisplayNameFormatOptions;
  }>();

  const emit = defineEmits<{
    options: [value: DisplayNameFormatOptions];
    config: [value: string];
  }>();

  const options = ref<any>(initial || {});

  const numbers = /^\d+$/;

  const finalOptions = computed(() => {
    const result: DisplayNameFormatOptions = {};

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

    return result;
  });

  const prettyOptions = computed(() => {
    const result: string[] = [];
    result.push('{');
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
  <NFormItem label="style"
    ><NSelect
      clearable
      v-model:value="options.style"
      placeholder="─── unset ───"
      :options="opts(['long', 'short', 'narrow'])"
  /></NFormItem>
  <NFormItem label="fallback"
    ><NSelect
      clearable
      v-model:value="options.fallback"
      placeholder="─── unset ───"
      :options="opts(['code', 'none'])"
  /></NFormItem>
  <NFormItem label="languageDisplay"
    ><NSelect
      clearable
      v-model:value="options.languageDisplay"
      placeholder="─── unset ───"
      :options="opts(['dialect', 'standard'])"
  /></NFormItem>
</template>
