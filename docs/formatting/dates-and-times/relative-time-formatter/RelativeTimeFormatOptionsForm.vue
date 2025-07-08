<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { RelativeTimeFormatOptions } from '@localizer/all';

  const { initial } = defineProps<{
    initial: RelativeTimeFormatOptions;
  }>();

  const emit = defineEmits<{
    options: [value: RelativeTimeFormatOptions];
    config: [value: string];
  }>();

  const options = ref<any>(initial || {});

  const numbers = /^\d+$/;

  const finalOptions = computed(() => {
    const result: RelativeTimeFormatOptions = {};

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

  const opts = (arr) => arr.map((item) => ({ label: String(item), value: item }));
</script>

<template>
  <NFormItem label="style"
    ><NSelect clearable v-model:value="options.style" :options="opts(['long', 'short', 'narrow'])"
  /></NFormItem>
  <NFormItem label="numeric"
    ><NSelect clearable v-model:value="options.numeric" :options="opts(['always', 'auto'])"
  /></NFormItem>
  <NFormItem label="stops"
    ><NSelect
      clearable
      multiple
      v-model:value="options.stops"
      :options="opts(['second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'])"
  /></NFormItem>
</template>
