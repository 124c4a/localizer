<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Decimal <Package name="format"/>

> **[decimal](../../../api/_localizer/format/decimal/index.md)** ( `value`: _number | bigint_ )
>
> - `value` - The value to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter provides locale-aware formatting for integers and decimals, ensuring consistent and culturally appropriate representation.

**Examples:**

<DemoValueFormatter :demo="demos.decimal"/>
