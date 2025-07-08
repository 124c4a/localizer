---
entity:
  type: number
  pkg: format
  name: relativePercent
  summary: Calculates the relative change between two values and formats it as a percentage.
  example: relativePercent(35, 50)
  configurable: false
  maturity: public
  related:
---

# relativePercent <Package name="format"/>

Calculates the relative change between two values and formats it as a percentage.

## Usage

```typescript twoslash
import { relativePercent } from '@localizer/format';

const result = relativePercent(35, 50);
```

The first argument specifies the initial reference value, representing the state before the change. The second argument defines the updated value, representing the state after the change.

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
