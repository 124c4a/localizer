---
entity:
  type: other
  pkg: format
  name: list
  summary: Formats lists by joining elements with a locale-specific separator.
  example: list([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# list <Package name="format"/>

Formats lists by joining elements with a locale-specific separator.

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
  import { NFormItem } from 'naive-ui/es/form';
  import { loc } from '@localizer/core';

  const value = [loc`A`, loc`B`, loc`C`, loc`D`];
</script>

<EntityDemo :args="[value]">
</EntityDemo>

## See also

<Entities />
