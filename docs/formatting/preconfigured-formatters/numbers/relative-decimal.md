<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Relative decimal <Badge type="info" text="@localizer/format" />

> **[relativeDecimal](../../../api/_localizer/format/relativeDecimal/index.md)** ( `value`: _number | bigint_ , `reference`: _number | bigint_ )
>
> - `value` - The value to format.
> - `reference` - The reference value.
>
> Both arguments can be either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter builds upon the functionality of [number formatter](./decimal.md) to format the difference between a value and a reference in a locale-aware manner. It ensures that the resulting output adheres to the same configuration as `decimal`, providing consistency in numerical representation.

**Examples:**

<DemoValueFormatter :demo="demos.relativeDecimal"/>
