---
order: 2
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Time <Package name="format"/>

> **[time](../../../api/_localizer/format/time/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

Outputs the time portion of a date based on the user's locale.

**Examples:**

<DemoValueFormatter :demo="demos.time"/>
