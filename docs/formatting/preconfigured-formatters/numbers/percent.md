<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Percentage <Badge type="info" text="@localizer/format" />

> **[percent](../../../api/_localizer/format/percent/index.md)** ( `value`: _number | bigint_ )
>
> - `value` - The value to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). The value represent fraction of a whole, where _1.0_ corresponds to _100%_.

This is a powerful formatter tailored for locale-aware representation of percentage values. It uses a default configuration to ensure consistent and culturally appropriate formatting, making it ideal for presenting percentage data in various contexts.

**Examples:**

<DemoValueFormatter :demo="demos.percent"/>
