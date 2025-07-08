---
title: decimal range formatter
entity:
  type: number
  pkg: format-number
  name: decimalRangeFormatter
  summary: Arbitrary unit-less amount range (configurable)
  example: "decimalRangeFormatter({notation: 'compact',compactDisplay: 'long'})(1000, 2000)"
  configurable: true
  maturity: public
  fn: (options, start, end) => decimalRangeFormatter(options)(start, end)
  related:
    - decimalRange
---

# decimalFormatter <Package name="format-number"/>

This formatter provides configurable formatting for generic number ranges.

## Usage

```typescript twoslash
import { decimalRangeFormatter } from '@localizer/format-number';

const formatter = decimalRangeFormatter({
  notation: 'compact',
  compactDisplay: 'long',
});
const result = formatter(1000, 2000);
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

  const start = ref(1000);
  const end = ref(2000);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, start, end]">

<NumberFormatOptionsForm :initial="{notation: 'compact',compactDisplay: 'long'}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Range start"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Range end"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
