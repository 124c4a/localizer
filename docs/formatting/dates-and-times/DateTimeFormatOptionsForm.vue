<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { NSpace } from 'naive-ui/es/space';
  import { NDivider } from 'naive-ui/es/divider';
  import { DateTimeFormatOptions } from '@localizer/format-datetime';

  const { initial } = defineProps<{
    initial: DateTimeFormatOptions;
  }>();

  const emit = defineEmits<{
    options: [value: DateTimeFormatOptions];
    config: [value: string];
  }>();

  const options = ref<any>(initial || {});

  const numbers = /^\d+$/;

  const finalOptions = computed(() => {
    const result: DateTimeFormatOptions = {};

    if (options.value.dateStyle) {
      result.dateStyle = options.value.dateStyle;
    }
    if (options.value.timeStyle) {
      result.timeStyle = options.value.timeStyle;
    }
    if (!options.value.dateStyle && !options.value.timeStyle) {
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

  const opts = (arr, notClearable = false) =>
    notClearable
      ? arr.map((item) => ({ label: String(item), value: item }))
      : [
          { label: '─── unset ───', value: null },
          ...arr.map((item) => ({ label: String(item), value: item })),
        ];
  const hasPreset = computed(() => {
    return options.value.dateStyle || options.value.timeStyle;
  });
</script>

<template>
  <NDivider title-placement="left">Preset options</NDivider>

  <NFormItem label="dateStyle"
    ><NSelect
      clearable
      v-model:value="options.dateStyle"
      placeholder="─── unset ───"
      :options="opts(['full', 'long', 'medium', 'short'])"
  /></NFormItem>
  <NFormItem label="timeStyle"
    ><NSelect
      clearable
      v-model:value="options.timeStyle"
      placeholder="─── unset ───"
      :options="opts(['full', 'long', 'medium', 'short'])"
  /></NFormItem>

  <NDivider title-placement="left">Date/time component options</NDivider>

  <NFormItem label="weekday"
    ><NSelect
      clearable
      v-model:value="options.weekday"
      :options="opts(['long', 'short', 'narrow'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="era"
    ><NSelect
      clearable
      v-model:value="options.era"
      :options="opts(['long', 'short', 'narrow'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="year"
    ><NSelect
      clearable
      v-model:value="options.year"
      :options="opts(['numeric', '2-digit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="month"
    ><NSelect
      clearable
      v-model:value="options.month"
      :options="opts(['numeric', '2-digit', 'long', 'short', 'narrow'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="day"
    ><NSelect
      clearable
      v-model:value="options.day"
      :options="opts(['numeric', '2-digit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="dayPeriod"
    ><NSelect
      clearable
      v-model:value="options.dayPeriod"
      :options="opts(['narrow', 'short', 'long'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="hour"
    ><NSelect
      clearable
      v-model:value="options.hour"
      :options="opts(['numeric', '2-digit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="minute"
    ><NSelect
      clearable
      v-model:value="options.minute"
      :options="opts(['numeric', '2-digit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="second"
    ><NSelect
      clearable
      v-model:value="options.second"
      :options="opts(['numeric', '2-digit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="fract.SecondDigits"
    ><NSelect
      clearable
      v-model:value="options.fractionalSecondDigits"
      :options="opts([1, 2, 3])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>
  <NFormItem label="formatMatcher"
    ><NSelect
      clearable
      v-model:value="options.formatMatcher"
      :options="opts(['basic', 'best fit'])"
      placeholder="─── unset ───"
      :disabled="hasPreset"
  /></NFormItem>

  <NDivider title-placement="left">Presentation options</NDivider>

  <NFormItem label="hour12"
    ><NSelect
      clearable
      v-model:value="options.hour12"
      :options="opts([true, false])"
      placeholder="─── unset ───"
      :disabled="options.hourCycle != undefined"
  /></NFormItem>
  <NFormItem label="hourCycle"
    ><NSelect
      clearable
      v-model:value="options.hourCycle"
      :options="opts(['h11', 'h12', 'h23', 'h24'])"
      placeholder="─── unset ───"
      :disabled="options.hour12 != undefined"
  /></NFormItem>
  <NFormItem label="parts"
    ><NSelect
      clearable
      multiple
      v-model:value="options.parts"
      placeholder="─── unset ───"
      :options="
        opts(
          [
            'weekday',
            'era',
            'year',
            'month',
            'day',
            'dayPeriod',
            'hour',
            'minute',
            'second',
            'fractionalSecond',
            'timeZoneName',
            'literal',
            'relatedYear',
            'yearName',
            'unknown',
          ],
          true,
        )
      "
  /></NFormItem>
</template>
