---
entity:
  type: number
  pkg: format-number
  name: decimalFormatter
  summary: Configurable formatter for generic numbers.
  example: "decimalFormatter({notation: 'compact',compactDisplay: 'long'})(1234567.89)"
  configurable: true
  maturity: public
  fn: (options, value) => decimalFormatter(options)(value)
  related:
    - decimal
    - decimalRangeFormatter
---

# decimalFormatter <Package name="format-number"/>

The `decimalFormatter` is a versatile and customizable utility designed for formatting numeric values. It supports various configurations, allowing you to tailor the output to meet specific requirements, such as compact notation or localized display formats.

## Usage

```typescript twoslash
import { decimalFormatter } from '@localizer/format-number';

const formatter = decimalFormatter({
  notation: 'compact',
  compactDisplay: 'long',
});
const result = formatter(1234567.89);
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const value = ref(1234567.89);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, value]">

<NumberFormatOptionsForm :initial="{notation: 'compact',compactDisplay: 'long'}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value"><NInputNumber clearable v-model:value="value" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
