<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Measurement <Badge type="info" text="@localizer/format" />

> **[unit](../../../api/_localizer/format/unit/index.md)** ( `value`: _number | bigint_ , `unit`: _[Unit](../../../api/_localizer/format-number/Unit/index.md)_ )
>
> - `value` - The measurement to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
> - `unit` - The measurement unit, a valid [ECMA-402](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers) unit identifier.

This is a versatile formatter designed for locale-aware representation of measurement values. It ensures culturally appropriate and consistent formatting by utilizing a default configuration, making it suitable for a wide range of measurement data across various contexts.

**Examples:**

<DemoValueFormatter :demo="demos.unit"/>
