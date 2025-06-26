---
order: 1
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Date <Badge type="info" text="@localizer/format" />

> **[date](../../../api/_localizer/format/date/index.md)** ( `value`: _Date | number_ )
>
> - `value` - The value to format. Can be JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or numeric timestamp (milliseconds since _January 1, 1970, 00:00:00 UTC_).

This formatter outputs the date portion according to the user's locale preferences. It supports customization through [configuration options](../../../introduction/configuration.md), allowing you to adapt the formatting to specific requirements.

**Examples:**

<DemoValueFormatter :demo="demos.date"/>
