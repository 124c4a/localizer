---
title: decimal range
entity:
  type: number
  pkg: format
  name: decimalRange
  summary: Arbitrary unitless amount range
  example: decimalRange(1000, 2000)
  configurable: false
  maturity: public
  related:
    - decimalRangeFormatter
---

# decimalRange <Package name="format"/>

This formatter provides formatting for generic number ranges.

## Usage

```typescript twoslash
import { decimalRange } from '@localizer/format';

const result = decimalRange(1000, 2000);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';

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
