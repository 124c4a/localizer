---
title: currency code formatter
entity:
  type: string
  pkg: format-number
  name: currencyCodeFormatter
  summary: Currency name or symbol (configurable)
  example: "currencyCodeFormatter({ currencyDisplay: 'name'})('GBP')"
  configurable: true
  maturity: public
  fn: (options, value) => currencyCodeFormatter(options)(value)
  related:
    - currency
---

# currencyCodeFormatter <Package name="format-number"/>

This formatter provides a configurable formatting for currency names or symbols.

## Usage

```typescript twoslash
import { currencyCodeFormatter } from '@localizer/format-number';

const formatter = currencyCodeFormatter({
  currencyDisplay: 'name',
});
const result = formatter('GBP');
```

Formatter options let you customize number formatting to suit your needs. They include:

- [Unit and currency options](./options/unit-and-currency-options.md): Format units and currencies.

::: info NOTE

Most of these options are derived from the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) API, which provides a robust way to format numbers in JavaScript based on locale and formatting preferences.

:::

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import CurrencyCodeFormatOptionsForm from './CurrencyCodeFormatOptionsForm.vue';
  import { currencyName } from '@localizer/format';

  const config = ref();
  const options = ref({});

  const unit = ref('GBP');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[options, unit]">

<CurrencyCodeFormatOptionsForm :initial="{currencyDisplay: 'name'}" @config="$event => config = $event" @options="$event => options = $event" showCurrencyOptions/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
