---
entity:
  type: date
  pkg: format-datetime
  name: dateTimeRangeFormatter
  summary: Configurable formatter for date and time ranges.
  example: "dateTimeRangeFormatter({ month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric'})(new Date(2025, 2, 23, 11, 40, 35), new Date(2025,2,23,11,59,0))"
  configurable: true
  maturity: public
  fn: (options, start, end) => dateTimeRangeFormatter(options)(start, end)
  related:
    - decimal
---

# dateTimeRangeFormatter <Package name="format-datetime"/>

Configurable formatter for date and time ranges.

## Usage

```typescript twoslash
import { dateTimeRangeFormatter } from '@localizer/format-datetime';

const formatter = dateTimeRangeFormatter({
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
});
const rangeStart = new Date(2025, 2, 23, 11, 40, 35);
const rangeEnd = new Date(2025, 2, 23, 12, 59, 0);

const result = formatter(rangeStart, rangeEnd);
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDivider } from 'naive-ui/es/divider';
  import { NDatePicker } from 'naive-ui/es/date-picker';
  import DateTimeFormatOptionsForm from './DateTimeFormatOptionsForm.vue';

  const start = ref(1742722835000);
  const end = ref(1742723940000);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, start, end]">

<DateTimeFormatOptionsForm :initial="{ month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric'}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Range start">
<NDatePicker v-model:value="start" type="datetime" />
</NFormItem>
<NFormItem label="Range end">
<NDatePicker v-model:value="end" type="datetime" />
</NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
