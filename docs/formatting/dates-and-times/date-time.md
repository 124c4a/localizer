---
title: date time
entity:
  type: date
  pkg: format
  name: dateTime
  summary: Time
  example: dateTime(new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# dateTime <Package name="format"/>

This formatter provides formatting for date and time parts.

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
