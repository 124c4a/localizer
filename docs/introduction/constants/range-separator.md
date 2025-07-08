---
title: decirangemal separator
entity:
  type: constant
  pkg: format
  name: RangeSeparator
  summary: Range separator
  example: RangeSeparator
  fn: () => RangeSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# RangeSeparator <Package name="format"/>

This constant renders range separator.

## Usage

```typescript twoslash
import { RangeSeparator } from '@localizer/format';

const result = RangeSeparator;
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
