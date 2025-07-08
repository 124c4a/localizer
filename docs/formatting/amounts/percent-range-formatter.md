---
title: percent range formatter
entity:
  type: number
  pkg: format-number
  name: percentRangeFormatter
  summary: Percentage ratio amount range (configurable)
  example: 'percentRangeFormatter({minimumFractionDigits: 2,maximumFractionDigits: 2})(0.1, 0.2)'
  configurable: true
  maturity: public
  fn: (options, start, end) => percentRangeFormatter(options)(start, end)
  related:
    - percentRange
---

# percentRangeFormatter <Package name="format-number"/>

This formatter provides configurable formatting for generic percentage ratio ranges.

## Usage

```typescript twoslash
import { percentRangeFormatter } from '@localizer/format-number';

const formatter = percentRangeFormatter({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const result = formatter(0.1, 0.2);
```

The argument passed to this formatter represents a ratio in its unscaled form, where a value of `1.0` corresponds to `100%`.

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

  const start = ref(0.1);
  const end = ref(0.2);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, start, end]">

<NumberFormatOptionsForm :initial="{minimumFractionDigits: 2,maximumFractionDigits: 2}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Range start"><NInputNumber clearable v-model:value="start" :step="0.01"/></NFormItem>
<NFormItem label="Range end"><NInputNumber clearable v-model:value="end" :step="0.01"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
