<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Percentage range <Package name="format"/>

> **[percentRange](../../../api/_localizer/format/percentRange/index.md)** ( `start`: _number | bigint_ , `end`: _number | bigint_ )
>
> - `start` - Start of the range (lower bound).
> - `end` - End of the range (upper bound).
>
> Both arguments can be provided as either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). These values represent fractions of a whole, where _1.0_ corresponds to _100%_.

This formatter formats percentage ranges with locale-aware representation, ensuring consistency and cultural appropriateness.

**Examples:**

<DemoValueFormatter :demo="demos.percentRange"/>
