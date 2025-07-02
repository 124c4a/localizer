---
order: 3
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Generic list <Package name="format"/>

> **[list](../../../api/_localizer/format/list/index.md)** ( `value`: _[Localizable](../../../introduction/localizable.md)[]_ )
>
> - `value` - The array of localizable values.

This formatter joins items into a list without using conjunctions or disjunctions, ideal for presenting units or items without grammatical connectors.

**Examples:**

<DemoValueFormatter :demo="demos.list"/>
