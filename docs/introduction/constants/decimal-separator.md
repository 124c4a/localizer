---
title: decimal separator
entity:
  type: constant
  pkg: format
  name: DecimalSeparator
  summary: Decimal separator
  example: DecimalSeparator
  fn: () => DecimalSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# DecimalSeparator <Package name="format"/>

This constant renders decimal separator for numeric values.

## Usage

```typescript twoslash
import { DecimalSeparator } from '@localizer/format';

const result = DecimalSeparator;
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
