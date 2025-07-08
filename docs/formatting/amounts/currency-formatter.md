---
entity:
  type: number
  pkg: format-number
  name: currencyFormatter
  summary: Configurable formatter for monetary amounts with currency.
  example: "currencyFormatter({  currencyDisplay: 'symbol',  notation: 'compact',  compactDisplay: 'short'})(21436587, 'EUR')"
  configurable: true
  maturity: public
  fn: (options, value, unit) => currencyFormatter(options)(value, unit)
  related:
    - currency
---

# currencyFormatter <Package name="format-number"/>

A versatile and customizable utility for formatting monetary values with currency. This formatter allows you to define how currency is displayed, including options for symbols, compact notation, and more.

## Usage

```typescript twoslash
import { currencyFormatter } from '@localizer/format-number';

const formatter = currencyFormatter({
  currencyDisplay: 'symbol',
  notation: 'compact',
  compactDisplay: 'short',
});
const result = formatter(21436587, 'EUR');
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';
  import { currencyName } from '@localizer/format';

  const value = ref(21436587);
  const config = ref();
  const options = ref({});

  const unit = ref('EUR');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[options, value, unit]">

<NumberFormatOptionsForm :initial="{currencyDisplay: 'symbol', notation: 'compact', compactDisplay: 'short'}" @config="$event => config = $event" @options="$event => options = $event" showCurrencyOptions/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value"><NInputNumber clearable v-model:value="value" /></NFormItem>
<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
