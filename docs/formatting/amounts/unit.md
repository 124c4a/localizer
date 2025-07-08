---
entity:
  type: number
  pkg: format
  name: unit
  summary: Formats measurement values with units.
  example: unit(120, 'kilometer-per-hour')
  configurable: false
  maturity: public
  related:
    - unitFormatter
---

# currency <Package name="format"/>

Formats measurement values with units.

## Usage

```typescript twoslash
import { unit } from '@localizer/format';

const result = unit(120, 'kilometer-per-hour');
```

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';

  const value = ref(120);
  const unitNom = ref('kilometer');
  const unitDen = ref('hour');

  const unitOptions = Intl.supportedValuesOf('unit').map(unit => ({label: `${unit}`, value: unit}));
  const unit = computed(() => {
    if (!unitDen.value) {
      return unitNom.value;
    } else {
      return unitNom.value + '-per-' + unitDen.value;
    }
  })
</script>

<EntityDemo :args="[value, unit]">
  <NFormItem label="Value">
    <NInputNumber clearable v-model:value="value" />
  </NFormItem>
  <NFormItem label="Unit (nominator)">
    <NSelect filterable v-model:value="unitNom" :options="unitOptions"/>
  </NFormItem>
  <NFormItem label="Unit (denominator)">
    <NSelect clearable filterable v-model:value="unitDen" :options="unitOptions"/>
  </NFormItem>
</EntityDemo>

## See also

<Entities />
