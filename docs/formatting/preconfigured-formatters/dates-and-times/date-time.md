---
order: 3
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date and time <Package name="format"/>

> **[dateTime](../../../api/_localizer/format/date/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. . Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter displays date and time based on the user's locale.

**Examples:**

<DemoValueFormatter :demo="demos.dateTime"/>
