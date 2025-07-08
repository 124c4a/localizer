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

Configurable formatter for relative changes between two values as a percentage.

## Usage

```typescript twoslash
import { relativePercentFormatter } from '@localizer/format-number';

const formatter = relativePercentFormatter({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const result = formatter(3500, 5000);
```

Represents the change from an initial reference value (first argument) to an updated value (second argument).

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NDivider } from 'naive-ui/es/divider';
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
