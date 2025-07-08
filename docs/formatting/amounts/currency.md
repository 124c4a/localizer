---
entity:
  type: number
  pkg: format
  name: currency
  summary: Formats monetary amounts with a specified currency.
  example: currency(1005, 'EUR')
  configurable: false
  maturity: public
  related:
    - currencyFormatter
---

# currency <Package name="format"/>

This formatter is designed to format monetary amounts with their respective currencies, ensuring clarity and consistency in financial representations.

## Usage

```typescript twoslash
import { currency } from '@localizer/format';

const result = currency(1005, 'EUR');
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { currencyName } from '@localizer/format';

  const value = ref(1005);
  const unit = ref('EUR');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));
</script>

<EntityDemo :args="[value, unit]">
  <NFormItem label="Value">
    <NInputNumber clearable v-model:value="value" />
  </NFormItem>
  <NFormItem label="Currency">
    <NSelect filterable v-model:value="unit" :options="unitOptions"/>
  </NFormItem>
</EntityDemo>

## See also

<Entities />
