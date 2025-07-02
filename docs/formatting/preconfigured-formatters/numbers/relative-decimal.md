<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Relative decimal <Package name="format"/>

> **[relativeDecimal](../../../api/_localizer/format/relativeDecimal/index.md)** ( `value`: _number | bigint_ , `reference`: _number | bigint_ )
>
> - `value` - The value to format.
> - `reference` - The reference value.
>
> Both arguments can be either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter calculates the difference between a value and a reference and formats it in a locale-aware manner.

**Examples:**

<DemoValueFormatter :demo="demos.relativeDecimal"/>
