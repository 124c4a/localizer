---
entity:
  type: date
  pkg: format
  name: date
  summary: Formats date.
  example: date(new Date(2025,2,23,11,59,0))
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# date <Package name="format"/>

Formats date.

## Usage

```typescript twoslash
import { date } from '@localizer/format';

const result = date(new Date(2025, 2, 23, 12, 59, 0));
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
