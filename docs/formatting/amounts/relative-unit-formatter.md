---
title: relative unit formatter
entity:
  type: number
  pkg: format-number
  name: relativeUnitFormatter
  summary: Absolute change of measurement value with predefined unit (configurable)
  example: "relativeUnitFormatter('gram', { unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact' })(3500, 5000)"
  configurable: true
  maturity: public
  fn: (options, start, end, unit) => relativeUnitFormatter(unit, options)(start, end)
  related:
    - decimalRange
---

# relativeUnitFormatter <Package name="format-number"/>

This formatter provides configurable formatting for absolute changes of measurement values with predefined unit.

## Usage

```typescript twoslash
import { relativeUnitFormatter } from '@localizer/format-number';

const formatter = relativeUnitFormatter('gram', {
  notation: 'compact',
  maximumSignificantDigits: 2,
  unitDisplay: 'narrow',
});
const result = formatter(3500, 5000);
```

Formatter options let you customize number formatting to suit your needs. They include:

- [Presentation options](./options/presentation-options.md): Adjust visual formatting.
- [Unit and currency options](./options/unit-and-currency-options.md): Format units and currencies.
- [Digit options](./options/digit-options.md): Control precision and rounding.

::: info NOTE

Most of these options are derived from the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) API, which provides a robust way to format numbers in JavaScript based on locale and formatting preferences.

:::

## Demo

<script setup>
  import { ref, computed, watch } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';
  import { currencyName } from '@localizer/format';

  const start = ref(3500);
  const end = ref(5000);
  const config = ref();
  const options = ref({});

  const unitNom = ref('gram');
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

<NumberFormatOptionsForm :initial="{ unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact' }" @config="$event => config = $event" @options="$event => options = $event" showCurrencyOptions/>

<NDivider title-placement="left">Predefined unit</NDivider>
<NFormItem label="Unit (nominator)"><NSelect filterable v-model:value="unitNom" :options="unitOptions"/></NFormItem>
<NFormItem label="Unit (denominator)"><NSelect clearable filterable v-model:value="unitDen" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value before change"><NInputNumber clearable v-model:value="start" /></NFormItem>
<NFormItem label="Value after change"><NInputNumber clearable v-model:value="end" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
