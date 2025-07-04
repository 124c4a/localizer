---
order: 7
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Relative time <Package name="format"/>

> **[relativeTime](../../../api/_localizer/format/relativeTime/index.md)** ( `value`: _Date | number_ , `reference`: _Date | number_ )
>
> - `value` - The value to format.
> - `reference` - The reference moment of time. Typically current moment of time (`new Date()`).
>
> Both arguments can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects or numeric timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter creates a localized, human-readable relative time string, such as "5 minutes ago" or "in 2 days," based on a reference time and the user's locale.

**Examples:**

<DemoValueFormatter :demo="demos.relativeTime"/>
