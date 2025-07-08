---
title: thousand separator
entity:
  type: constant
  pkg: format
  name: ThousandSeparator
  summary: Thousand separator
  example: ThousandSeparator
  fn: () => ThousandSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# ThousandSeparator <Package name="format"/>

This constant renders thousand separator for numeric values.

## Usage

```typescript twoslash
import { ThousandSeparator } from '@localizer/format';

const result = ThousandSeparator;
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
