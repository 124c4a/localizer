---
order: 4
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date range <Package name="format"/>

> **[dateRange](../../../api/_localizer/format/dateRange/index.md)** ( `start`: _Date | number_ , `end`: _Date | number_ )
>
> - `start` - Start of the range (lower bound).
> - `end` - End of the range (upper bound).
>
> Both arguments can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects or numeric timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter extends the [date formatter](./date.md) to display a range of dates in a locale-aware format.

::: info NOTE

Unlike [date/time range formatter](./date-time-range.md) or [`Intl.DateTimeFormat.formatRange()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange), this formatter always displays the full representation of each date for clarity and precision.

:::

**Examples:**

<DemoValueFormatter :demo="demos.dateRange"/>
