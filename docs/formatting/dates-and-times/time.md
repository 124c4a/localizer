---
title: time
entity:
  type: date
  pkg: format
  name: time
  summary: Time
  example: time(new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# time <Package name="format"/>

This formatter provides formatting for time part.

## Usage

```typescript twoslash
import { time } from '@localizer/format';

const result = time(new Date(2025, 2, 23, 12, 59, 0));
```

Formatter accepts JavaScript Date objects or numbers, which are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  const value = ref(1742727540000);
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NDatePicker v-model:value="value" type="datetime" />
  </NFormItem>
</EntityDemo>

## See also

<Entities />
