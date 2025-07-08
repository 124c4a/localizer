---
title: fixed unit range formatter
entity:
  type: number
  pkg: format-number
  name: fixedUnitRangeFormatter
  summary: Measurement value range with predefined unit (configurable)
  example: "fixedUnitRangeFormatter('byte', {unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact'})(1200000, 1440000)"
  configurable: true
  maturity: public
  fn: (options, start, end, unit) => fixedUnitRangeFormatter(unit, options)(start, end)
  related:
    - fixedUnitFormatter
---

# fixedUnitRangeFormatter <Package name="format-number"/>

This formatter provides configurable formatting for measurement value ranges with predefined unit.

## Usage

```typescript twoslash
import { fixedUnitRangeFormatter } from '@localizer/format-number';

const formatter = fixedUnitRangeFormatter('byte', {
  unitDisplay: 'narrow',
  maximumSignificantDigits: 2,
  notation: 'compact',
});
const result = formatter(1200000, 1440000);
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

  const start = ref(1200000);
  const end = ref(1440000);

  const config = ref();
  const options = ref({});

  const unitNom = ref('byte');
  const unitDen = ref();

  const unitOptions = Intl.supportedValuesOf('unit').map(unit => ({label: `${unit}`, value: unit}));
  const unit = computed(() => {
    if (!unitDen.value) {
      return unitNom.value;
    } else {
      return unitNom.value + '-per-' + unitDen.value;
    }
  })

</script>

<EntityDemo :args="[options, start, end, unit]">

<NumberFormatOptionsForm :initial="{ unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact' }" @config="$event => config = $event" @options="$event => options = $event" showUnitOptions/>

<NDivider title-placement="left">Predefined unit</NDivider>
<NFormItem label="Unit (nominator)"><NSelect filterable v-model:value="unitNom" :options="unitOptions"/></NFormItem>
<NFormItem label="Unit (denominator)"><NSelect clearable filterable v-model:value="unitDen" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Range start"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Range end"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
