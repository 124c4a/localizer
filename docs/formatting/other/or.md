---
entity:
  type: other
  pkg: format
  name: or
  summary: Formats lists by joining elements with "or".
  example: or([loc`A`, loc`B`, loc`C`, loc`D`])
  configurable: false
  maturity: public
  related:
    - listFormatter
    - list
    - and
---

# or <Package name="format"/>

The `or` formats a list of elements by joining them with the word "or," creating a natural and readable output. It is particularly useful for generating human-friendly text from arrays of localized strings or other elements.

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
