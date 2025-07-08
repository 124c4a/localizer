---
entity:
  type: number
  pkg: format-number
  name: relativeDecimalFormatter
  summary: Configurable formatter for absolute changes in unitless amounts.
  example: "relativeDecimalFormatter({notation: 'compact',compactDisplay: 'long'})(3500, 5000)"
  configurable: true
  maturity: public
  fn: (options, start, end) => relativeDecimalFormatter(options)(start, end)
  related:
    - decimalRange
---

# relativeDecimalFormatter <Package name="format-number"/>

Configurable formatter for absolute changes in unitless amounts.

## Usage

```typescript twoslash
import { relativeDecimalFormatter } from '@localizer/format-number';

const formatter = relativeDecimalFormatter({
  notation: 'compact',
  compactDisplay: 'long',
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

<NumberFormatOptionsForm :initial="{notation: 'compact',compactDisplay: 'long'}" @config="$event => config = $event" @options="$event => options = $event"/>

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
