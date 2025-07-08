---
title: relative currency formatter
entity:
  type: number
  pkg: format-number
  name: relativeCurrencyFormatter
  summary: Absolute change of monetary amount with predefined currency (configurable)
  example: "relativeCurrencyFormatter('EUR', {notation: 'compact',compactDisplay: 'long'})(3500, 5000)"
  configurable: true
  maturity: public
  fn: (options, start, end, unit) => relativeCurrencyFormatter(unit, options)(start, end)
  related:
    - decimalRange
---

# relativeCurrencyFormatter <Package name="format-number"/>

This formatter provides configurable formatting for absolute changes of monetary amounts with predefined currency.

## Usage

```typescript twoslash
import { relativeCurrencyFormatter } from '@localizer/format-number';

const formatter = relativeCurrencyFormatter('EUR', {
  notation: 'compact',
  compactDisplay: 'long',
});
const result = formatter(3500, 5000);
```

See [formatter options](./options/index.md) for formatter configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';
  import { currencyName } from '@localizer/format';

  const start = ref(3500);
  const end = ref(5000);
  const config = ref();
  const options = ref({});

  const unit = ref('EUR');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[options, start, end, unit]">

<NumberFormatOptionsForm :initial="{notation: 'compact',compactDisplay: 'long'}" @config="$event => config = $event" @options="$event => options = $event" showCurrencyOptions/>

<NDivider title-placement="left">Predefined currency</NDivider>
<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value before change"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Value after change"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
