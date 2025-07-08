---
entity:
  type: number
  pkg: format
  name: decimalRange
  summary: Formats generic number ranges.
  example: decimalRange(1000, 2000)
  configurable: false
  maturity: public
  related:
    - decimalRangeFormatter
    - decimal
---

# decimalRange <Package name="format"/>

The `decimalRange` is used to format and display a range of numbers, such as a start and end value. It ensures the range is presented in a clear and readable format, making it suitable for various applications like financial data, reports, or user interfaces.

## Usage

```typescript twoslash
import { decimalRange } from '@localizer/format';

const result = decimalRange(1000, 2000);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const start = ref(1000);
  const end = ref(2000);
</script>

<EntityDemo :args="[start, end]">
  <NFormItem label="Range start">
    <NInputNumber clearable v-model:value="start" />
  </NFormItem>
  <NFormItem label="Range end">
    <NInputNumber clearable v-model:value="end" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
