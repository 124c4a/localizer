---
title: percent formatter
entity:
  type: number
  pkg: format-number
  name: percentFormatter
  summary: Percentage amount (configurable)
  example: 'percentFormatter({minimumFractionDigits: 2,maximumFractionDigits: 2})(1.46)'
  configurable: true
  maturity: public
  fn: (options, value) => percentFormatter(options)(value)
  related:
    - percent
---

# percentFormatter <Package name="format-number"/>

Configurable formatter for percentage ratios.

## Usage

```typescript twoslash
import { percentFormatter } from '@localizer/format-number';

const formatter = percentFormatter({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const result = formatter(1.46);
```

The argument passed to this formatter represents a ratio in its unscaled form, where a value of `1.0` corresponds to `100%`.

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const value = ref(1.46);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, value]">

<NumberFormatOptionsForm :initial="{minimumFractionDigits: 2,maximumFractionDigits: 2}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value"><NInputNumber clearable v-model:value="value" :step="0.01"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
