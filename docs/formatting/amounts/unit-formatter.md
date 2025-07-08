---
title: unit formatter
entity:
  type: number
  pkg: format-number
  name: unitFormatter
  summary: Measurement value with unit (configurable)
  example: "unitFormatter({unitDisplay: 'long'})(120, 'kilometer-per-hour')"
  configurable: true
  maturity: public
  fn: (options, value, unit) => unitFormatter(options)(value, unit)
  related:
    - unit
    - fixedUnitFormatter
---

# unitFormatter <Package name="format-number"/>

This formatter provides configurable formatting for measurement values with units.

## Usage

```typescript twoslash
import { unitFormatter } from '@localizer/format-number';

const formatter = unitFormatter({
  unitDisplay: 'long',
});
const result = formatter(120, 'kilometer-per-hour');
```

See [formatter options](./options/index.md) for formatter configuration details.

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const value = ref(120);
  const config = ref();
  const options = ref({});

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

<EntityDemo :args="[options, value, unit]">

<NumberFormatOptionsForm :initial="{ unitDisplay: 'long' }" @config="$event => config = $event" @options="$event => options = $event" showUnitOptions/>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value"><NInputNumber clearable v-model:value="value" /></NFormItem>
<NFormItem label="Unit (nominator)"><NSelect filterable v-model:value="unitNom" :options="unitOptions"/></NFormItem>
<NFormItem label="Unit (denominator)"><NSelect clearable filterable v-model:value="unitDen" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
