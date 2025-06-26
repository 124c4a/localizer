---
order: 4
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Currency symbol <Badge type="info" text="@localizer/format" />

> **[currencySymbol](../../../api/_localizer/format/currencySymbol/index.md)** ( `value`: _[CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)_ )
>
> - `value` - The value to format, a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.

This formatter returns the locale-specific symbol for a given currency code. This is useful for displaying currency values in a format that aligns with the user's regional settings.

**Examples:**

<DemoValueFormatter :demo="demos.currencySymbol"/>
