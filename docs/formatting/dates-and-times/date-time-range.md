---
entity:
  type: date
  pkg: format
  name: dateTimeRange
  summary: Formats date/time ranges.
  example: dateTimeRange(new Date(2025, 2, 23, 11, 40, 35), new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - dateRange
    - dateTimeRangeFormatter
---

# dateTimeRange <Package name="format"/>

The `dateTimeRange` is used to format date and time ranges in a human-readable way. It takes two arguments representing the start and end of the range and returns a formatted string that clearly conveys the range.

## Usage

```typescript twoslash
import { dateTimeRange } from '@localizer/format';

const rangeStart = new Date(2025, 2, 23, 11, 40, 35);
const rangeEnd = new Date(2025, 2, 23, 12, 59, 0);

const result = dateTimeRange(rangeStart, rangeEnd);
```

Formatter accepts JavaScript Date objects or numbers, which are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  const start = ref(1742722835000);
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
