---
title: date time range formatter
entity:
  type: date
  pkg: format-datetime
  name: dateTimeRangeFormatter
  summary: Date/time range (configurable)
  example: "dateTimeRangeFormatter({ month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric'})(new Date(2025, 2, 23, 11, 40, 35), new Date(2025,2,23,11,59,0))"
  configurable: true
  maturity: public
  fn: (options, start, end) => dateTimeRangeFormatter(options)(start, end)
  related:
    - decimal
---

# dateTimeRangeFormatter <Package name="format-datetime"/>

This formatter provides configurable formatting for date and time ranges.

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

See [formatter options](./options/index.md) for formatter configuration details.

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
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
