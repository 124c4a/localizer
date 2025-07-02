<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Currency <Package name="format"/>

> **[currency](../../../api/_localizer/format/currency/index.md)** ( `value`: _number | bigint_ , `unit`: _[CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)_ )
>
> - `value` - The monetary amount to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
> - `unit` - The currency, a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.

This formatter ensures locale-aware and consistent formatting of monetary values, making it suitable for presenting financial data.

**Examples:**

<DemoValueFormatter :demo="demos.currency"/>
