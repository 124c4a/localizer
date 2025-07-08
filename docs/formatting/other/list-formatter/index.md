---
title: list formatter
entity:
  type: other
  pkg: format-list
  name: listFormatter
  summary: List joined with a configurable separator
  example: 'listFormatter({delimiter: loc` :: `})([loc`A`, loc`B`, loc`C`, loc`D`])'
  fn: (options, value) => listFormatter(options)(value)
  configurable: true
  maturity: public
  related:
    - decimalFormatter
---

# listFormatter <Package name="format-list"/>

This formatter provides configurable formatting for lists.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { listFormatter } from '@localizer/format-list';

const formatter = listFormatter({ delimiter: loc` :: ` });
const values = [loc`A`, loc`B`, loc`C`, loc`D`];

const result = formatter(values);
```

## Demo

<script setup>
  import { ref } from 'vue';
  import { NForm, NFormItem } from 'naive-ui/es/form';
  import { NInputNumber } from 'naive-ui/es/input-number';
  import { loc } from '@localizer/core';
  import ListFormatOptionsForm from './ListFormatOptionsForm.vue'

  const value = [loc`A`, loc`B`, loc`C`, loc`D`];
  const config = ref();
  const options = ref({});
</script>

<EntityDemo :args="[options, value]">

<ListFormatOptionsForm :initial="{delimiter:' :: '}" @config="$event => config = $event" @options="$event => options = $event"/>

<NDivider title-placement="left">Options object</NDivider>

```-vue
{{ config }}
```

</EntityDemo>

## See also

<Entities />
