---
title: current language
entity:
  type: constant
  pkg: format
  name: CurrentLanguage
  summary: Current language or locale name
  example: CurrentLanguage
  fn: () => CurrentLanguage
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# CurrentLanguage <Package name="format"/>

This constant renders current language or locale.

## Usage

```typescript twoslash
import { CurrentLanguage } from '@localizer/format';

const result = CurrentLanguage;
```

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { NSelect } from 'naive-ui/es/select';
  import { countryName, languageName } from '@localizer/format';

</script>

<EntityDemo :args="[]" />

## See also

<Entities />
