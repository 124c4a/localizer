---
title: list
entity:
  type: other
  pkg: format
  name: list
  summary: List joined with a locale-specific separator
  example: list([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# list <Package name="format"/>

This formatter provides formatting for lists using a locale-specific separator as a joiner.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { list } from '@localizer/format';

const values = [loc`A`, loc`B`, loc`C`, loc`D`];
const result = list(values);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { loc } from '@localizer/core';

  const value = [loc`A`, loc`B`, loc`C`, loc`D`];
</script>

<EntityDemo :args="[value]">
</EntityDemo>

## See also

<Entities />
