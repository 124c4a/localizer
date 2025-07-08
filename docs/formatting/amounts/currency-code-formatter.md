---
entity:
  type: string
  pkg: format-number
  name: currencyCodeFormatter
  summary: Configurable formatter for currency names or symbols.
  configurable: true
  maturity: public
  fn: (options, value) => currencyCodeFormatter(options)(value)
  related:
    - currency
---

# currencyCodeFormatter <Package name="format-number"/>

Configurable formatter for currency names or symbols.

## Usage

```typescript twoslash
import { currencyCodeFormatter } from '@localizer/format-number';

const formatter = currencyCodeFormatter({
  currencyDisplay: 'name',
});
const result = formatter('GBP');
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
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
