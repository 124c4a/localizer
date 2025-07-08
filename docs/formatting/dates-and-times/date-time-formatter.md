---
title: date time formatter
entity:
  type: date
  pkg: format-datetime
  name: dateTimeFormatter
  summary: Date/time (configurable)
  example: "dateTimeFormatter({ weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})(new Date(2025,2,23,11,59,0))"
  configurable: true
  maturity: public
  fn: (options, value) => dateTimeFormatter(options)(value)
  related:
    - decimal
---

# dateTimeFormatter <Package name="format-datetime"/>

This formatter provides configurable formatting for dates and times.

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

Formatter options let you customize date and time formatting to suit your needs. These options are grouped into categories:

- [Presets](./date-time-options/presets.md): Choose predefined date and time formats.
- [Date and time components](./date-time-options/date-time-component-options.md): Adjust how dates and times are displayed.
- [Presentation](./date-time-options/presentation-options.md): Customize the visual style of formatted values.

::: info NOTE

Most options are based on the [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) API.

:::

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
