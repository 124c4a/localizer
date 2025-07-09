---
entity:
  type: number
  pkg: format-number
  name: decimalRangeFormatter
  summary: Configurable formatter for generic number ranges.
  example: "decimalRangeFormatter({notation: 'compact',compactDisplay: 'long'})(1000, 2000)"
  configurable: true
  maturity: public
  fn: (options, start, end) => decimalRangeFormatter(options)(start, end)
  related:
    - decimalRange
    - decimalFormatter
---

# decimalRangeFormatter <Package name="format-number"/>

The `decimalRangeFormatter` provides a flexible and customizable way to format numeric ranges. It is particularly useful for scenarios where you need to display a range of numbers with specific formatting options, such as compact notation or localized styles.

## Usage

```typescript twoslash
import { decimalRangeFormatter } from '@localizer/format-number';

const formatter = decimalRangeFormatter({
  notation: 'compact',
  compactDisplay: 'long',
});
const result = formatter(1000, 2000);
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NDivider } from 'naive-ui/es/divider';
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
