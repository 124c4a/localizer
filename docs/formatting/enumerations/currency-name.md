---
title: currency name
entity:
  type: string
  pkg: format
  name: currencyName
  summary: Currency name
  example: "currencyName('GBP')"
  configurable: false
  maturity: public
  related:
    - currency
---

# currencyName <Package name="format"/>

This formatter provides formatting for currency names.

## Usage

```typescript twoslash
import { currencyName } from '@localizer/format';

const result = currencyName('GBP');
```

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import { currencyName } from '@localizer/format';

  const unit = ref('GBP');

  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

</script>

<EntityDemo :args="[unit]">

<NFormItem label="Currency"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>

</EntityDemo>

## See also

<Entities />
