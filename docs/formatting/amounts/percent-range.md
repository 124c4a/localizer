---
entity:
  type: number
  pkg: format
  name: percentRange
  summary: Formats percentage ratio ranges.
  example: percentRange(0.1, 0.2)
  configurable: false
  maturity: public
  related:
    - percentRangeFormatter
    - percent
---

# percentRange <Package name="format"/>

The `percentRange` formats a range of percentage ratios, converting unscaled numeric values into a human-readable percentage range. For example, given the inputs `0.1` and `0.2`, the output would represent the range `10% - 20%`.

## Usage

```typescript twoslash
import { percentRange } from '@localizer/format';

const result = percentRange(0.1, 0.2);
```

The arguments passed to this formatter represent a ratio in its unscaled form, where a value of `1.0` corresponds to `100%`.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';

  const start = ref(0.1);
  const end = ref(0.2);
</script>

<EntityDemo :args="[start, end]">
  <NFormItem label="Range start">
    <NInputNumber clearable v-model:value="start" :step="0.01" />
  </NFormItem>
  <NFormItem label="Range end">
    <NInputNumber clearable v-model:value="end"  :step="0.01" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
