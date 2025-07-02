---
order: 3
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Currency name <Package name="format"/>

> **[currencyName](../../../api/_localizer/format/currencyName/index.md)** ( `value`: _[CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)_ )
>
> - `value` - The value to format, a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.

This formatter returns the localized name of a currency based on its [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code, adapting to the user's locale.

**Examples:**

<DemoValueFormatter :demo="demos.currencyName"/>
