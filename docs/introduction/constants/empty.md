---
title: empty
entity:
  type: constant
  pkg: core
  name: Empty
  summary: Empty string
  example: Empty
  fn: () => Empty
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# Empty <Package name="core"/>

This constant renders empty string.

## Usage

```typescript twoslash
import { Empty } from '@localizer/core';

const result = Empty;
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
