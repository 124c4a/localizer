---
entity:
  type: date
  pkg: format-datetime
  name: dateTimeFormatter
  summary: Configurable formatter for dates and times.
  example: "dateTimeFormatter({ weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})(new Date(2025,2,23,11,59,0))"
  configurable: true
  maturity: public
  fn: (options, value) => dateTimeFormatter(options)(value)
  related:
    - decimal
---

# dateTimeFormatter <Package name="format-datetime"/>

Configurable formatter for dates and times.

## Usage

```typescript twoslash
import { dateTimeFormatter } from '@localizer/format-datetime';

const formatter = dateTimeFormatter({
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});
const result = formatter(new Date(2025, 2, 23, 11, 59, 0));
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NDivider } from 'naive-ui/es/divider';
  import { NDatePicker } from 'naive-ui/es/date-picker';
  import DateTimeFormatOptionsForm from './DateTimeFormatOptionsForm.vue';

  const value = ref(1742723940000);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, value]">

<DateTimeFormatOptionsForm :initial="{ weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value">
<NDatePicker v-model:value="value" type="datetime" />
</NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
