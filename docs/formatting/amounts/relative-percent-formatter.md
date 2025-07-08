---
title: relative percent formatter
entity:
  type: number
  pkg: format-number
  name: relativePercentFormatter
  summary: Relative change of unitless amount (configurable)
  example: 'relativePercentFormatter({minimumFractionDigits: 2,maximumFractionDigits: 2})(3500, 5000)'
  configurable: true
  maturity: public
  fn: (options, start, end) => relativePercentFormatter(options)(start, end)
  related:
    - decimalRange
---

# relativeDecimalFormatter <Package name="format-number"/>

This formatter calculates and formats the relative change between two unitless amounts, expressing the result as a percentage.

## Usage

```typescript twoslash
import { relativePercentFormatter } from '@localizer/format-number';

const formatter = relativePercentFormatter({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const result = formatter(3500, 5000);
```

Formatter options let you customize number formatting to suit your needs. They include:

- [Presentation options](./options/presentation-options.md): Adjust visual formatting.
- [Digit options](./options/digit-options.md): Control precision and rounding.

::: info NOTE

Most of these options are derived from the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) API, which provides a robust way to format numbers in JavaScript based on locale and formatting preferences.

:::

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const start = ref(3500);
  const end = ref(5000);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, start, end]">

<NumberFormatOptionsForm :initial="{minimumFractionDigits: 2,maximumFractionDigits: 2}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value before change"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Value after change"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
