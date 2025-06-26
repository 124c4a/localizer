---
order: 3
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date and time <Badge type="info" text="@localizer/format" />

> **[dateTime](../../../api/_localizer/format/date/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. . Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter outputs both the date and time components based on the user's locale settings. It offers flexibility through [configuration options](../../../introduction/configuration.md), enabling customization to meet specific formatting needs.

**Examples:**

<DemoValueFormatter :demo="demos.dateTime"/>
