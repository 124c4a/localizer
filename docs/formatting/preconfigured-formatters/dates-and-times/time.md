---
order: 2
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Time <Badge type="info" text="@localizer/format" />

> **[time](../../../api/_localizer/format/time/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter outputs the time portion of a date according to the user's locale preferences. It ensures that the output aligns with regional conventions, providing a user-friendly representation of time. This formatter is also customizable through [configuration options](../../../introduction/configuration.md), allowing for tailored formatting to suit specific needs.

**Examples:**

<DemoValueFormatter :demo="demos.time"/>
