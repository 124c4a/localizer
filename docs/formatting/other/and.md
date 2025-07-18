---
entity:
  type: other
  pkg: format
  name: and
  summary: Formats lists by joining elements with "and".
  example: and([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - listFormatter
    - or
    - list
---

# and <Package name="format"/>

The `and` formats a list of elements by joining them with the word "and," creating a natural and readable output. It is particularly useful for generating human-friendly text from arrays of localized strings or other elements.

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
