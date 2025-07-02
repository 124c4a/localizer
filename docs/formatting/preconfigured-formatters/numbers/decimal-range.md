<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Decimal range <Package name="format"/>

> **[decimalRange](../../../api/_localizer/format/decimalRange/index.md)** ( `start`: _number | bigint_ , `end`: _number | bigint_ )
>
> - `start` - Start of the range (lower bound).
> - `end` - End of the range (upper bound).
>
> Both arguments can be either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter handles numerical ranges, ensuring that both the start and end values are formatted according to locale-specific conventions.

**Examples:**

<DemoValueFormatter :demo="demos.decimalRange"/>
