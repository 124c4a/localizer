---
title: and
entity:
  type: other
  pkg: format
  name: and
  summary: List joined with conjunction (and)
  example: and([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# and <Package name="format"/>

This formatter provides formatting for lists using conjunction as a joiner (and).

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { and } from '@localizer/format';

const values = [loc`A`, loc`B`, loc`C`, loc`D`];
const result = and(values);
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
