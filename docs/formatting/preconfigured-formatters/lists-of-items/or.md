---
order: 2
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Disjunction (or) <Badge type="info" text="@localizer/format" />

> **[or](../../../api/_localizer/format/or/index.md)** ( `value`: _[Localizable](../../../introduction/localizable.md)[]_ )
>
> - `value` - The array of localizable values.

This formatter generates lists by joining items with a disjunction (e.g., "or") in a way that respects the locale's grammar and formatting rules.

**Examples:**

<DemoValueFormatter :demo="demos.or"/>
