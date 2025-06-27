---
order: 1
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Conjunction (and) <Badge type="info" text="@localizer/format" />

> **[and](../../../api/_localizer/format/and/index.md)** ( `value`: _[Localizable](../../../introduction/localizable.md)[]_ )
>
> - `value` - The array of localizable values.

This formatter creates lists by joining items with a conjunction (e.g., "and") while adhering to the locale's grammar and formatting rules.

**Examples:**

<DemoValueFormatter :demo="demos.and"/>
