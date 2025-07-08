---
entity:
  type: number
  pkg: format-number
  name: fixedUnitFormatter
  summary: Configurable formatter for measurement values with a predefined unit.
  example: "fixedUnitFormatter('byte', {unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact'})(1440000)"
  configurable: true
  maturity: public
  fn: (options, value, unit) => fixedUnitFormatter(unit, options)(value)
  related:
    - unitFormatter
    - fixedUnitRangeFormatter
---

# fixedUnitFormatter <Package name="format-number"/>

The `fixedUnitFormatter` is a versatile utility designed to format measurement values with a predefined unit. It allows you to customize the output using various configuration options, such as unit display style, significant digits, and notation format. This makes it ideal for presenting numerical data in a clear and concise manner, tailored to your specific requirements.

## Usage

```typescript twoslash
import { fixedUnitFormatter } from '@localizer/format-number';

const formatter = fixedUnitFormatter('byte', {
  unitDisplay: 'narrow',
  maximumSignificantDigits: 2,
  notation: 'compact',
});
const result = formatter(1440000);
```

See [formatter options](./options/index.md) for configuration details.

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import NumberFormatOptionsForm from './NumberFormatOptionsForm.vue';

  const value = ref(1440000);
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

<EntityDemo :args="[options, value, unit]">

<NumberFormatOptionsForm :initial="{ unitDisplay: 'narrow', maximumSignificantDigits: 2, notation: 'compact' }" @config="$event => config = $event" @options="$event => options = $event" showUnitOptions/>

<NDivider title-placement="left">Predefined unit</NDivider>
<NFormItem label="Unit (nominator)"><NSelect filterable v-model:value="unitNom" :options="unitOptions"/></NFormItem>
<NFormItem label="Unit (denominator)"><NSelect clearable filterable v-model:value="unitDen" :options="unitOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Value"><NInputNumber clearable v-model:value="value" /></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
