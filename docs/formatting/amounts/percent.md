---
entity:
  type: number
  pkg: format
  name: percent
  summary: Formats percentage ratios.
  example: percent(1.46)
  configurable: false
  maturity: public
  related:
    - percentFormatter
    - percentRange
---

# percent <Package name="format"/>

This formatter is used to convert numerical ratios into percentage representations. For example, a value of `1.0` is equivalent to `100%`, making it easy to display ratios in a human-readable percentage format.

## Usage

```typescript twoslash
import { percent } from '@localizer/format';

const result = percent(1.46);
```

The argument passed to this formatter represents a ratio in its unscaled form, where a value of `1.0` corresponds to `100%`.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';

  const value = ref(1.46);
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NInputNumber clearable v-model:value="value" :step="0.01"/>
  </NFormItem>
</EntityDemo>

## See also

<Entities />
