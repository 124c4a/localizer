---
entity:
  type: number
  pkg: format-number
  name: fixedCurrencyRangeFormatter
  summary: Configurable formatter for monetary ranges with a fixed currency.
  example: "fixedCurrencyRangeFormatter('EUR', {  currencyDisplay: 'symbol',  notation: 'compact',  compactDisplay: 'short'})(1000, 1500)"
  configurable: true
  maturity: public
  fn: (options, start, end, unit) => fixedCurrencyRangeFormatter(unit, options)(start, end)
  related:
    - fixedCurrencyFormatter
---

# fixedCurrencyRangeFormatter <Package name="format-number"/>

A customizable formatter designed for monetary ranges, ensuring a consistent fixed currency display.

## Usage

```typescript twoslash
import { fixedCurrencyRangeFormatter } from '@localizer/format-number';

const formatter = fixedCurrencyRangeFormatter('EUR', {
  currencyDisplay: 'symbol',
  notation: 'compact',
  compactDisplay: 'short',
});
const result = formatter(1000, 1500);
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';
  import { currencyName } from '@localizer/format';

  const start = ref(1000);
  const end = ref(1500);
  const config = ref();
  const options = ref({});

  const unit = ref('EUR');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[options, start, end, unit]">

<NumberFormatOptionsForm :initial="{currencyDisplay: 'symbol', notation: 'compact', compactDisplay: 'short'}" @config="$event => config = $event" @options="$event => options = $event" showCurrencyOptions/>

<NDivider title-placement="left">Predefined currency</NDivider>
<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Range start"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Range end"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
