---
title: date range
entity:
  type: date
  pkg: format
  name: dateRange
  summary: Date range
  example: dateRange(new Date(2022,1,15,4,20,35), new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# dateRange <Package name="format"/>

This formatter provides formatting for date ranges.

## Usage

```typescript twoslash
import { dateRange } from '@localizer/format';

const rangeStart = new Date(2022, 1, 15, 4, 20, 35);
const rangeEnd = new Date(2025, 2, 23, 12, 59, 0);

const result = dateRange(rangeStart, rangeEnd);
```

Formatter accepts JavaScript Date objects or numbers, which are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  const start = ref(1644891635000);
  const end = ref(1742723940000);
</script>

<EntityDemo :args="[start, end]">
  <NFormItem label="Range start">
    <NDatePicker v-model:value="start" type="datetime" />
  </NFormItem>
  <NFormItem label="Range end">
    <NDatePicker v-model:value="end" type="datetime" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
