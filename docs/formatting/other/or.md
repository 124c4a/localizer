---
title: or
entity:
  type: other
  pkg: format
  name: or
  summary: List joined with disjunction (or)
  example: or([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# or <Package name="format"/>

Formats lists by joining elements with "or".

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { or } from '@localizer/format';

const values = [loc`A`, loc`B`, loc`C`, loc`D`];
const result = or(values);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { loc } from '@localizer/core';

  const value = [loc`A`, loc`B`, loc`C`, loc`D`];
</script>

<EntityDemo :args="[value]">
</EntityDemo>

## See also

<Entities />
