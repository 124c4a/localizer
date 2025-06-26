<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Number range <Badge type="info" text="@localizer/format" />

> **[decimalRange](../../../api/_localizer/format/decimalRange/index.md)** ( `start`: _number | bigint_ , `end`: _number | bigint_ )
>
> - `start` - Start of the range (lower bound).
> - `end` - End of the range (upper bound).
>
> Both arguments can be either a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

This formatter extends the functionality of [decimal formatter](./decimal.md) to handle number ranges. It is specifically designed for locale-aware formatting of numerical ranges, ensuring both start and end values are presented in a culturally appropriate manner using the same configuration as `decimal`.

**Examples:**

<DemoValueFormatter :demo="demos.decimalRange"/>
