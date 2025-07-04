---
title: decimal
entity:
  type: number
  pkg: format
  name: decimal
  summary: Generic formatter for numbers
  example: decimal(1234567.89)
  configurable: false
  maturity: public
  related:
    - decimalRange
---

# decimal <Package name="format"/>

This formatter provides formatting for generic numbers.

## Usage

```typescript twoslash
import { decimal } from '@localizer/format';

const result = decimal(1234567.89);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';

  const value = ref(1234567.89);
</script>

<EntityDemo name="decimal" :args="[value]">
  <NFormItem label="Value to format">
    <NInputNumber clearable v-model:value="value" />
  </NFormItem>
</EntityDemo>

## See also

<Entities related="decimal" />
