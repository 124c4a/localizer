---
title: relative time formatter
entity:
  type: date
  pkg: format-relativetime
  name: relativeTimeFormatter
  summary: Relative time in past or future (configurable)
  example: "relativeTimeFormatter({ numeric: 'auto', stops:['day'] })(new Date(2025,2,23,11,59,0), new Date(2025, 2, 23, 11, 40, 35))"
  configurable: true
  maturity: public
  fn: (options, reference, value) => relativeTimeFormatter(options)(reference, value)
  related:
    - decimal
---

# relativeTimeFormatter <Package name="format-datetime"/>

This formatter provides configurable formatting for relative moments of time in the past of future.

## Usage

```typescript twoslash
import { relativeTimeFormatter } from '@localizer/format-relativetime';

const formatter = relativeTimeFormatter({ numeric: 'auto', stops: ['day'] });
const reference = new Date(2025, 2, 23, 12, 59, 0); // Typically new Date()
const value = new Date(2025, 2, 23, 11, 40, 35);

const result = formatter(reference, value);
```

See [formatter options](./options.md) for formatter configuration details.

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import { NDatePicker } from 'naive-ui/es/date-picker';
  import RelativeTimeFormatOptionsForm from './RelativeTimeFormatOptionsForm.vue';

  const reference = ref(1742723940000);
  const value = ref(1742722835000);
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, reference, value]">

<RelativeTimeFormatOptionsForm :initial="{ numeric: 'auto', stops:['day'] }" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Reference">
<NDatePicker v-model:value="reference" type="datetime" />
</NFormItem>
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
