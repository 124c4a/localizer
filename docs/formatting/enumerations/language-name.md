---
entity:
  type: string
  pkg: format
  name: languageName
  summary: Formats language or locale names.
  example: languageName('sv-FI')
  configurable: false
  maturity: public
  related:
    - displayNameFormatter
    - CurrentLanguage
---

# languageName <Package name="format"/>

The `languageName` is used to format language or locale identifiers into human-readable names. It simplifies working with language codes by providing a localized and user-friendly representation.

## Usage

```typescript twoslash
import { languageName } from '@localizer/format';

const result = languageName('sv-FI');
```

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NSelect } from 'naive-ui/es/select';
  import { countryName, languageName } from '@localizer/format';
  import { countries } from './country-name';
  import { languages } from './language-name';

  const country = ref('FI');
  const countryOptions = countries.map(it => ({label: `${it} - ${countryName(it).localize('en-US')}`, value: it}));

  const language = ref('sv');
  const languageOptions = languages.map(it => ({label: `${it} - ${languageName(it).localize('en-US')}`, value: it}));

    const value = computed(() => {
    if (!country.value) {
      return language.value;
    } else {
      return language.value + '-' + country.value;
    }
  })

</script>

<EntityDemo :args="[value]">
  <NFormItem label="Language">
    <NSelect filterable v-model:value="language" :options="languageOptions"/>
  </NFormItem>
  <NFormItem label="Country">
    <NSelect filterable v-model:value="country" :options="countryOptions" clearable/>
  </NFormItem>
</EntityDemo>

## See also

<Entities />
