<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Currency <Badge type="info" text="@localizer/format" />

> **[currency](../../../api/_localizer/format/currency/index.md)** ( `value`: _number | bigint_ , `unit`: _[CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)_ )
>
> - `value` - The monetary amount to format. Can be a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) or a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
> - `unit` - The currency, a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.

This is a robust formatter tailored for locale-aware representation of monetary values. It ensures consistent and culturally appropriate formatting by leveraging a default configuration, making it ideal for presenting financial data across various contexts.

**Examples:**

<DemoValueFormatter :demo="demos.currency"/>
