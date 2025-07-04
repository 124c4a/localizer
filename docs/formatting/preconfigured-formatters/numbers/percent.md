<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Percentage <Package name="format"/>

> **[percent](../../../api/_localizer/format/percent/index.md)** ( `value`: _number | bigint_ )
>
> - `value` - The value to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). The value represent fraction of a whole, where _1.0_ corresponds to _100%_.

This formatter ensures locale-aware and consistent representation of percentage values, ideal for displaying percentage data accurately.

**Examples:**

<DemoValueFormatter :demo="demos.percent"/>
