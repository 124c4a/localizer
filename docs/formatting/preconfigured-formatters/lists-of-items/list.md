---
order: 3
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Generic list <Badge type="info" text="@localizer/format" />

> **[list](../../../api/_localizer/format/list/index.md)** ( `value`: _[Localizable](../../../introduction/localizable.md)[]_ )
>
> - `value` - The array of localizable values.

This formatter creates lists by joining items without using conjunctions or disjunctions. This is particularly useful for presenting lists of units or items where no grammatical connectors are needed.

**Examples:**

<DemoValueFormatter :demo="demos.list"/>
