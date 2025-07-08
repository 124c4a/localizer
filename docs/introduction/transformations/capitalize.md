---
entity:
  type: transformer
  pkg: transform
  name: capitalize
  summary: Converts the first letter of input to uppercase.
  example: transform(loc`lower UPPER`, [capitalize])
  argument: loc`lower UPPER`
  fn: (value) => transform(loc(() => value), [capitalize])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# capitalize <Package name="transform"/>

Converts the first letter of input to uppercase.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { transform, capitalize } from '@localizer/transform';

const value = loc`lower UPPER`;

const result = transform(value, [capitalize]);
```

## Demo

<script setup>
  import { ref, computed } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
  import { NInput } from 'naive-ui/es/input';

  const value = ref('lower UPPER');
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NInput v-model:value="value" type="text" />
  </NFormItem>

</EntityDemo>

## See also

<Entities />
