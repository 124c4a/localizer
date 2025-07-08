---
entity:
  type: date
  pkg: format
  name: dateTime
  summary: Formats date/time.
  example: dateTime(new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - date
    - dateTimeFormatter
    - time
---

# dateTime <Package name="format"/>

The `dateTime` provides a convenient way to format date and time values.

## Usage

```typescript twoslash
import { dateTime } from '@localizer/format';

const result = dateTime(new Date(2025, 2, 23, 12, 59, 0));
```

Formatter accepts JavaScript Date objects or numbers, which are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  const value = ref(1742723940000);
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NDatePicker v-model:value="value" type="datetime" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
