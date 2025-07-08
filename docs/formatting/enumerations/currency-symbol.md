---
title: currency symbol
entity:
  type: string
  pkg: format
  name: currencySymbol
  summary: Currency symbol
  example: "currencySymbol('GBP')"
  configurable: false
  maturity: public
  related:
    - currency
---

# currencySymbol <Package name="format"/>

Formats currency symbols.

## Usage

```typescript twoslash
import { currencySymbol } from '@localizer/format';

const result = currencySymbol('GBP');
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { currencyName } from '@localizer/format';

  const unit = ref('GBP');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[unit]">

<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

</EntityDemo>

## See also

<Entities />
