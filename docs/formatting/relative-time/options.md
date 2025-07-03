---
order: 2
---

# Formatter options

<script setup>
import DemoValueFormatterOptions from '../DemoValueFormatterOptions.vue';
import { relativeTimeFormatter } from '@localizer/all';

const dateInputs = (now) => [
  ['1980-06-19 00:05:31, now', new Date("1980-06-19 00:05:31"), now],
  ['2020-01-24 05:50:00, 2020-01-23 04:41:20', new Date('2020-01-24 05:50:00'), new Date('2020-01-23 04:41:20')]
];
</script>

## `style`

The `style` option determines the format of the relative time. Possible values:

- `"long"` (default): e.g., "in 1 month"
- `"short"`: e.g., "in 1 mo."
- `"narrow"`: e.g., "in 1 mo." (may resemble the short style in some locales)

**Examples:**

<DemoValueFormatterOptions option="style" :values="['long', 'short', 'narrow']" :factory=relativeTimeFormatter :inputs=dateInputs />

## `numeric`

Whether to include numeric values in the output. `"always"` (default) uses numbers like "1 day ago". `"auto"` allows phrases like "yesterday".

**Examples:**

<DemoValueFormatterOptions option="numeric" :values="['always', 'auto']" :factory=relativeTimeFormatter :inputs=dateInputs />

## `stops`

Defines the granularity for the relative time. Accepts an array of stops: `"year"`, `"quarter"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"second"`. Default: `["year", "month", "week", "day", "hour", "minute"]`.

::: info NOTE

This option is not part of [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat) API.

:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  numeric: 'auto';
}
```

:::

<DemoValueFormatterOptions option="stops" :values="[['second'], ['minute'], ['hour'], ['day'], ['day', 'week'], ['week'], ['month'], ['quarter'], ['year']]" :defaultOptions="{numeric:'auto'}" :factory=relativeTimeFormatter :inputs=dateInputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
