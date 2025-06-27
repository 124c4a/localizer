<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Relative percentage ratio change <Badge type="info" text="@localizer/format" />

> **[relativePercent](../../../api/_localizer/format/relativePercent/index.md)** ( `value`: _number | bigint_ , `reference`: _number | bigint_ )
>
> - `value` - The value to format.
> - `reference` - The reference value.
>
> Both arguments can be either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter calculates the percentage change between a value and a reference in a locale-aware manner.

:::info NOTE

Unlike `percent` and `percentRange`, this formatter accepts arbitrary numerical values and computes the percentage change internally.

:::

**Examples:**

<DemoValueFormatter :demo="demos.relativePercent"/>
