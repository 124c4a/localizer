---
title: upper case
entity:
  type: transformer
  pkg: transform
  name: upperCase
  summary: Transforms localizable to upper case
  example: transform(loc`lower UPPER`, [upperCase])
  argument: loc`lower UPPER`
  fn: (value) => transform(loc(() => value), [upperCase])
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# upperCase <Package name="transform"/>

This transformer changes all letters to upper case.

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
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInput } from 'naive-ui/es/input';
  import { NSelect } from 'naive-ui/es/select';

  const value = ref('lower UPPER');
</script>

<EntityDemo :args="[value]">
  <NFormItem label="Value">
    <NInput v-model:value="value" type="text" />
  </NFormItem>

</EntityDemo>

## See also

<Entities />
