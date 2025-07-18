<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NumberFormatOptions } from '@localizer/format-number';

  const { initial } = defineProps<{
    initial: NumberFormatOptions;
  }>();

  const emit = defineEmits<{
    options: [value: NumberFormatOptions];
    config: [value: string];
  }>();

  const options = ref<any>(initial || {});

  const numbers = /^\d+$/;

  const finalOptions = computed(() => {
    const result: NumberFormatOptions = {};
    Object.entries(options.value).forEach(([key, value]) => {
      if (value != null) {
        result[key] = value;
      }
    });

    return result;
  });

  const prettyOptions = computed(() => {
    const result: string[] = [];
    result.push('{');
    Object.entries(finalOptions.value).forEach(([key, value]) => {
      if (value != null) {
        result.push(`  ${key}: '${value}',`);
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
          { label: '──── unset ────', value: null },
          ...arr.map((item) => ({ label: String(item), value: item })),
        ];
</script>

<template>
  <NDivider title-placement="left">Currency options</NDivider>

  <NFormItem label="currencyDisplay"
    ><NSelect
      clearable
      placeholder="──── unset ────"
      v-model:value="options.currencyDisplay"
      :options="opts(['code', 'symbol', 'narrowSymbol', 'name'])"
  /></NFormItem>
</template>
