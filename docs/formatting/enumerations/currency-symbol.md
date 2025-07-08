---
entity:
  type: string
  pkg: format
  name: currencySymbol
  summary: Formats currency symbols.
  example: "currencySymbol('GBP')"
  configurable: false
  maturity: public
  related:
    - currencyName
    - currencyCodeFormatter
    - displayNameFormatter
---

# currencySymbol <Package name="format"/>

The `currencySymbol` is used to retrieve the symbol associated with a given currency code. It simplifies the process of formatting monetary values by providing the correct symbol for display purposes.

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
