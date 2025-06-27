<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Decimal <Badge type="info" text="@localizer/format" />

> **[decimal](../../../api/_localizer/format/decimal/index.md)** ( `value`: _number | bigint_ )
>
> - `value` - The value to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This is a versatile formatter designed for locale-aware representation of both integer and fractional numbers. It leverages a built-in default configuration to ensure consistent and culturally appropriate formatting, making it suitable for a wide range of numerical data presentation needs.

**Examples:**

<DemoValueFormatter :demo="demos.decimal"/>
