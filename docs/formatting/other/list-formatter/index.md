---
entity:
  type: other
  pkg: format-list
  name: listFormatter
  summary: Configurable formatter for lists of items.
  example: 'listFormatter({delimiter: loc` :: `})([loc`A`, loc`B`, loc`C`, loc`D`])'
  fn: (options, value) => listFormatter(options)(value)
  configurable: true
  maturity: public
  related:
    - and
    - or
    - list
---

# listFormatter <Package name="format-list"/>

The `listFormatter` is a versatile tool designed to format lists of items with customizable options. It allows you to define how list elements are joined together, making it easy to adapt to various localization and formatting requirements.

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { listFormatter } from '@localizer/format-list';

const formatter = listFormatter({ delimiter: loc` :: ` });
const values = [loc`A`, loc`B`, loc`C`, loc`D`];

const result = formatter(values);
```

See [formatter options](./options.md) for configuration details.

## Demo

<script setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui/es/form';
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
