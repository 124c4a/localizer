---
entity:
  type: number
  pkg: format
  name: decimal
  summary: Formats generic numbers.
  example: decimal(1234567.89)
  configurable: false
  maturity: public
  related:
    - decimalFormatter
    - decimalRange
---

# decimal <Package name="format"/>

The `decimal` is used to format numeric values into a human-readable string representation. It ensures proper formatting for large numbers, including thousands separators and decimal points, making it suitable for displaying monetary values or other numerical data.

## Usage

```typescript twoslash
import { decimal } from '@localizer/format';

const result = decimal(1234567.89);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const value = ref(1234567.89);
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NInputNumber clearable v-model:value="value" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
