---
title: relative time
entity:
  type: date
  pkg: format
  name: relativeTime
  summary: Relative time in past or future
  example: relativeTime(new Date(2025,2,23,11,59,0), new Date(2025, 2, 23, 11, 40, 35))
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# relativeTime <Package name="format"/>

Formats relative moments in the past or future.

## Usage

```typescript twoslash
import { relativeTime } from '@localizer/format';

const reference = new Date(2025, 2, 23, 12, 59, 0); // Typically new Date()
const value = new Date(2025, 2, 23, 11, 40, 35);

const result = relativeTime(reference, value);
```

Formatter accepts JavaScript Date objects or numbers, which are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  const reference = ref(1742723940000);
  const value = ref(1742722835000);
</script>

<EntityDemo :args="[reference, value]">
  <NFormItem label="Reference">
    <NDatePicker v-model:value="reference" type="datetime" />
  </NFormItem>
  <NFormItem label="Value">
    <NDatePicker v-model:value="value" type="datetime" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
