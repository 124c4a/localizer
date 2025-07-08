---
title: relative decimal
entity:
  type: number
  pkg: format
  name: relativeDecimal
  summary: Absolute change of unitless amount
  example: relativeDecimal(35, 50)
  configurable: false
  maturity: public
  related:
---

# relativeDecimal <Package name="format"/>

Formats absolute changes in unitless amounts.

## Usage

```typescript twoslash
import { relativeDecimal } from '@localizer/format';

const result = relativeDecimal(35, 50);
```

Represents the change from an initial reference value (first argument) to an updated value (second argument).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';

  const reference = ref(35);
  const value = ref(50);
</script>

<EntityDemo :args="[reference, value]">
  <NFormItem label="Value before change">
    <NInputNumber clearable v-model:value="reference" />
  </NFormItem>
  <NFormItem label="Value after change">
    <NInputNumber clearable v-model:value="value" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
