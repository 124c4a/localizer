---
order: 2
---

# Options

<script setup>
import { relativeTimeFormatter } from '@localizer/format-relativetime';

const dateInputs = () => [
  ['2020-01-24 05:50:00, 2020-01-23 04:41:20', new Date('2020-01-24 05:50:00'), new Date('2020-01-23 04:41:20')]
];
</script>

## `style`

The `style` option determines the format of the relative time. Possible values:

- `"long"` (default): e.g., "in 1 month"
- `"short"`: e.g., "in 1 mo."
- `"narrow"`: e.g., "in 1 mo." (may resemble the short style in some locales)

**Examples:**

<OptionsDemo option="style" :values="['long', 'short', 'narrow']" :factory=relativeTimeFormatter :inputs=dateInputs />

## `numeric`

Whether to include numeric values in the output. `"always"` (default) uses numbers like "1 day ago". `"auto"` allows phrases like "yesterday".

**Examples:**

<OptionsDemo option="numeric" :values="['always', 'auto']" :factory=relativeTimeFormatter :inputs=dateInputs />

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

<OptionsDemo option="stops" :values="[['second'], ['minute'], ['hour'], ['day'], ['week'], ['month'], ['quarter'], ['year']]" :defaultOptions="{numeric:'auto'}" :factory=relativeTimeFormatter :inputs=dateInputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
