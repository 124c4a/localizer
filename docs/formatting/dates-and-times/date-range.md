---
entity:
  type: date
  pkg: format
  name: dateRange
  summary: Formats date ranges.
  example: dateRange(new Date(2022,1,15,4,20,35), new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - dateTimeRangeFormatter
    - dateTimeRange
---

# dateRange <Package name="format"/>

The `dateRange` is used to format date ranges in a human-readable way. It takes two dates as input and returns a string representation of the range, making it easier to display periods of time in your application.

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
  import { NFormItem } from 'naive-ui/es/form';
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
