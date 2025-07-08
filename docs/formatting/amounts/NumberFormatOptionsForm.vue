<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NumberFormatOptions } from '@localizer/format-number';

  const { initial } = defineProps<{
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
        if (numbers.test(value as string)) {
          result[key] = Number(value);
        } else if (value === 'true') {
          result[key] = true;
        } else if (value === 'false') {
          result[key] = false;
        } else if (Array.isArray(value)) {
          if (value.length > 0) {
            result[key] = value;
          }
        } else {
          result[key] = value;
        }
      }
    });

    if (options.value.roundingIncrement) {
      result.minimumFractionDigits = 0;
      result.maximumFractionDigits = 0;
      result.minimumSignificantDigits = undefined;
      result.maximumSignificantDigits = undefined;
      result.roundingPriority = 'auto';
    }

    return result;
  });

  const prettyOptions = computed(() => {
    const result: string[] = [];
    result.push('{');
    Object.entries(finalOptions.value).forEach(([key, value]) => {
      if (value != null) {
        if (numbers.test(value as string)) {
          result.push(`  ${key}: ${value},`);
        } else if (value === 'true') {
          result.push(`  ${key}: ${value},`);
        } else if (value === 'false') {
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
  <NDivider title-placement="left">Presentation options</NDivider>

  <NFormItem label="notation"
    ><NSelect
      clearable
      v-model:value="options.notation"
      :options="opts(['standard', 'scientific', 'engineering', 'compact'])"
  /></NFormItem>
  <NFormItem label="compactDisplay"
    ><NSelect clearable v-model:value="options.compactDisplay" :options="opts(['short', 'long'])"
  /></NFormItem>
  <NFormItem label="useGrouping"
    ><NSelect
      clearable
      v-model:value="options.useGrouping"
      :options="opts(['always', 'auto', 'min2', true, false])"
  /></NFormItem>
  <NFormItem label="signDisplay"
    ><NSelect
      clearable
      v-model:value="options.signDisplay"
      :options="opts(['auto', 'always', 'exceptZero', 'negative', 'never'])"
  /></NFormItem>
  <NFormItem label="parts"
    ><NSelect
      clearable
      multiple
      v-model:value="options.parts"
      :options="
        opts([
          'literal',
          'integer',
          'group',
          'decimal',
          'fraction',
          'compact',
          'exponentSeparator',
          'exponentMinusSign',
          'exponentInteger',
          'nan',
          'infinity',
          'plusSign',
          'minusSign',
          'percentSign',
          'unit',
          'currency',
          'unknown',
        ])
      "
  /></NFormItem>

  <template v-if="showUnitOptions">
    <NDivider title-placement="left">Unit options</NDivider>

    <NFormItem label="unitDisplay"
      ><NSelect
        clearable
        v-model:value="options.unitDisplay"
        :options="opts(['short', 'narrow', 'long'])"
    /></NFormItem>
  </template>

  <template v-if="showCurrencyOptions">
    <NDivider title-placement="left">Currency options</NDivider>

    <NFormItem label="currencyDisplay"
      ><NSelect
        clearable
        v-model:value="options.currencyDisplay"
        :options="opts(['code', 'symbol', 'narrowSymbol', 'name'])"
    /></NFormItem>

    <NFormItem label="currencySign"
      ><NSelect
        clearable
        v-model:value="options.currencySign"
        :options="opts(['standard', 'accounting'])"
    /></NFormItem>
  </template>

  <NDivider title-placement="left">Digit options</NDivider>

  <NFormItem label="minimumIntegerDigits"
    ><NInputNumber clearable :min="1" :max="21" v-model:value="options.minimumIntegerDigits"
  /></NFormItem>
  <NFormItem label="minimumFractionDigits"
    ><NInputNumber
      clearable
      :min="0"
      :max="options.maximumFractionDigits ?? 100"
      v-model:value="options.minimumFractionDigits"
      :disabled="!!options.roundingIncrement"
  /></NFormItem>
  <NFormItem label="maximumFractionDigits"
    ><NInputNumber
      clearable
      :min="options.minimumFractionDigits ?? 0"
      :max="100"
      v-model:value="options.maximumFractionDigits"
      :disabled="!!options.roundingIncrement"
  /></NFormItem>
  <NFormItem label="minimumSignificantDigits"
    ><NInputNumber
      clearable
      :min="1"
      :max="options.maximumSignificantDigits ?? 21"
      v-model:value="options.minimumSignificantDigits"
      :disabled="!!options.roundingIncrement"
  /></NFormItem>
  <NFormItem label="maximumSignificantDigits"
    ><NInputNumber
      clearable
      :min="options.minimumSignificantDigits ?? 1"
      :max="21"
      v-model:value="options.maximumSignificantDigits"
      :disabled="!!options.roundingIncrement"
  /></NFormItem>
  <NFormItem label="roundingPriority"
    ><NSelect
      clearable
      v-model:value="options.roundingPriority"
      :options="opts(['auto', 'morePrecision', 'lessPrecision'])"
      :disabled="!!options.roundingIncrement"
  /></NFormItem>
  <NFormItem label="roundingIncrement"
    ><NSelect
      clearable
      v-model:value="options.roundingIncrement"
      :options="opts([1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000])"
  /></NFormItem>
  <NFormItem label="roundingMode"
    ><NSelect
      clearable
      v-model:value="options.roundingMode"
      :options="
        opts([
          'ceil',
          'floor',
          'expand',
          'trunc',
          'halfCeil',
          'halfFloor',
          'halfExpand',
          'halfTrunc',
          'halfEven',
        ])
      "
  /></NFormItem>
  <NFormItem label="trailingZeroDisplay"
    ><NSelect
      clearable
      v-model:value="options.trailingZeroDisplay"
      :options="opts(['auto', 'stripIfInteger'])"
  /></NFormItem>
</template>
