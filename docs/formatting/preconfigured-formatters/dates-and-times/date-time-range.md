---
order: 5
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date/time range <Badge type="info" text="@localizer/format" />

> **[dateTimeRange](../../../api/_localizer/format/dateTimeRange/index.md)** ( `start`: _Date | number_ , `end`: _Date | number_ )
>
> - `start` - Start of the range (lower bound).
> - `end` - End of the range (upper bound).
>
> Both arguments can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects or numeric timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter builds upon the [date and time formatter](./date-time.md) to present a range of dates in a locale-aware format.

**Examples:**

<DemoValueFormatter :demo="demos.dateTimeRange"/>
