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
    - displayNameFormatter
    - currencySymbol
    - currencyCodeFormatter
---

# currencyName <Package name="format"/>

The `currencyName` provides a user-friendly way to format and display currency names based on their ISO 4217 currency codes. It simplifies working with currency data by converting codes like `GBP` into their corresponding human-readable names.

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
