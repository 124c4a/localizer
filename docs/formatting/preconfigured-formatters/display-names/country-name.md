---
order: 2
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Country name <Badge type="info" text="@localizer/format" />

> **[countryName](../../../api/_localizer/format/countryName/index.md)** ( `value`: _[CountryCode](../../../api/_localizer/core/CountryCode/index.md)_ )
>
> - `value` - The value to format, a valid [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

This formatter provides the localized name of a given country or region. It ensures the output is translated based on the specified locale, offering seamless internationalization support.

**Examples:**

<DemoValueFormatter :demo="demos.countryName"/>
