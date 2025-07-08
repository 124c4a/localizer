---
title: lower case
entity:
  type: transformer
  pkg: transform
  name: lowerCase
  summary: Transforms localizable to lower case
  example: transform(loc`lower UPPER`, [lowerCase])
  argument: loc`lower UPPER`
  fn: (value) => transform(loc(() => value), [upperCase])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# lowerCase <Package name="transform"/>

This transformer changes all letters to lower case.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { transform, lowerCase } from '@localizer/transform';

const value = loc`lower UPPER`;

const result = transform(value, [lowerCase]);
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
