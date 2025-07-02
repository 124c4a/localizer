<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Measurement <Package name="format"/>

> **[unit](../../../api/_localizer/format/unit/index.md)** ( `value`: _number | bigint_ , `unit`: _[Unit](../../../api/_localizer/format-number/Unit/index.md)_ )
>
> - `value` - The measurement to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
> - `unit` - The measurement unit, a valid [ECMA-402](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers) unit identifier.

This formatter provides locale-aware formatting for measurement values, ensuring consistent and culturally appropriate representation.

**Examples:**

<DemoValueFormatter :demo="demos.unit"/>
