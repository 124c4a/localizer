<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NumberFormatOptions } from '@localizer/format-number';

  const { initial, showUnitOptions } = defineProps<{
    initial: NumberFormatOptions;
    showUnitOptions?: boolean;
    showCurrencyOptions?: boolean;
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

  const opts = (arr) => arr.map((item) => ({ label: String(item), value: item }));
</script>

<template>
  <NDivider title-placement="left">Currency options</NDivider>

  <NFormItem label="currencyDisplay"
    ><NSelect
      clearable
      v-model:value="options.currencyDisplay"
      :options="opts(['code', 'symbol', 'narrowSymbol', 'name'])"
  /></NFormItem>
</template>
