---
order: 1
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date <Package name="format"/>

> **[date](../../../api/_localizer/format/date/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter displays only the date, formatted based on the user's locale settings.

**Examples:**

<DemoValueFormatter :demo="demos.date"/>
