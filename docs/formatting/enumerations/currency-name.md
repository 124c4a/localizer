---
entity:
  type: string
  pkg: format
  name: currencyName
  summary: Formats currency names.
  example: "currencyName('GBP')"
  configurable: false
  maturity: public
  related:
    - currency
---

# currencyName <Package name="format"/>

Formats currency names.

## Usage

```typescript twoslash
import { currencyName } from '@localizer/format';

const result = currencyName('GBP');
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
