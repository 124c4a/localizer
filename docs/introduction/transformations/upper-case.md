---
entity:
  type: transformer
  pkg: transform
  name: upperCase
  summary: Converts all letters to uppercase.
  example: transform(loc`lower UPPER`, [upperCase])
  argument: loc`lower UPPER`
  fn: (value) => transform(loc(() => value), [upperCase])
  configurable: false
  maturity: public
  related:
    - lowerCase
    - capitalize
---

# upperCase <Package name="transform"/>

Converts all letters to uppercase.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { transform, upperCase } from '@localizer/transform';

const value = loc`lower UPPER`;

const result = transform(value, [upperCase]);
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
