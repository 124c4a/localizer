---
entity:
  type: string
  pkg: format
  name: countryName
  summary: Formats country names.
  example: countryName('US')
  configurable: false
  maturity: public
  related:
    - displayNameFormatter
---

# countryName <Package name="format"/>

The `countryName` provides a standardized way to format country names based on their ISO 3166-1 alpha-2 codes. It ensures consistency and localization support for displaying country names in various contexts.

## Usage

```typescript twoslash
import { countryName } from '@localizer/format';

const result = countryName('US');
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { countryName } from '@localizer/format';
  import { countries } from './country-name';

  const value = ref('US');
  const valueOptions = countries.map(it => ({label: `${it} - ${countryName(it).localize('en-US')}`, value: it}));
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NSelect filterable v-model:value="value" :options="valueOptions"/>
  </NFormItem>
</EntityDemo>

## See also

<Entities />
