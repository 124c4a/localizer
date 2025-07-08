---
entity:
  type: string
  pkg: format-displayname
  name: displayNameFormatter
  summary: Configurable formatter for country, language, and currency names.
  example: "displayNameFormatter('region', {style:'narrow'})('US')"
  configurable: true
  maturity: public
  fn: (type, options, value) => displayNameFormatter(type, options)(value)
  related:
    - decimal
---

# displayNameFormatter <Package name="format-displayname"/>

Configurable formatter for country, language, and currency names.

## Usage

```typescript twoslash
import { displayNameFormatter } from '@localizer/format-displayname';

const formatter = displayNameFormatter('region', { style: 'narrow' });

const result = formatter('US');
```

See [formatter options](./options.md) for configuration details.

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { NDivider } from 'naive-ui/es/divider';
  import DisplayNameFormatOptionsForm from './DisplayNameFormatOptionsForm.vue';
  import { countryName, languageName, currencyName } from '@localizer/format';
  import { countries } from '../country-name';
  import { languages } from '../language-name';

  const type = ref('region');
  const typeOptions = ['region','language','currency','dateTimeField'].map(it => ({label: it, value: it}));

  const country = ref('US');
  const countryOptions = countries.map(it => ({label: `${it} - ${countryName(it).localize('en-US')}`, value: it}));

  const language = ref('en');
  const languageOptions = languages.map(it => ({label: `${it} - ${languageName(it).localize('en-US')}`, value: it}));

  const unit = ref('GBP');
  const unitOptions = Intl.supportedValuesOf('currency').map(currency => ({label: `${currency} - ${currencyName(currency).localize('en-US')}`, value: currency}));

  const dateTimeField = ref('year');
  const dateTimeFieldOptions = ["era", "year", "quarter", "month", "weekOfYear", "weekday", "day", "dayPeriod", "hour", "minute", "second", "timeZoneName"].map(it => ({label: it, value: it}))

    const value = computed(() => {
      switch(type.value){
        case 'language':
          if (!country.value) {
            return language.value;
          } else {
            return language.value + '-' + country.value;
          }
        case 'region':
          return country.value;
        case 'currency':
          return unit.value;
        case 'dateTimeField':
          return dateTimeField.value;
      }
    });


  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[type, options, value]">

<DisplayNameFormatOptionsForm :initial="{style:'narrow'}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Formatter type</NDivider>
<NFormItem label="Formatter type"><NSelect filterable v-model:value="type" :options="typeOptions"/></NFormItem>

<NDivider title-placement="left">Input</NDivider>
<NFormItem label="Currency" v-if="type==='currency'"><NSelect filterable v-model:value="unit" :options="unitOptions"/></NFormItem>
<NFormItem label="Language" v-if="type==='language'">
<NSelect filterable v-model:value="language" :options="languageOptions"/>
</NFormItem>
<NFormItem label="Country" v-if="type==='language' || type==='region'">
<NSelect filterable v-model:value="country" :options="countryOptions" clearable/>
</NFormItem>
<NFormItem label="Date/time field" v-if="type==='dateTimeField'"><NSelect filterable v-model:value="dateTimeField" :options="dateTimeFieldOptions"/></NFormItem>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
