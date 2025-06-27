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

The style of the formatted relative time. Possible values are:

- `"long"` **(default)** - E.g., "in 1 month"
- `"short"` - E.g., "in 1 mo."
- `"narrow"` - E.g., "in 1 mo.". The narrow style could be similar to the short style for some locales.

**Examples:**

<DemoValueFormatterOptions option="style" :values="['long', 'short', 'narrow']" :factory=relativeTimeFormatter :inputs=dateInputs />

## `numeric`

Whether to use numeric values in the output. Possible values are `"always"` and `"auto"`; the default is `"always"`. When set to `"auto"`, the output may use more idiomatic phrasing such as "yesterday" instead of "1 day ago".

**Examples:**

<DemoValueFormatterOptions option="numeric" :values="['always', 'auto']" :factory=relativeTimeFormatter :inputs=dateInputs />

## `stops`

Defines the granularity level for the relative value. Accepts an array of stops from the list: `"year"`, `"quarter"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, or `"second"`. Defaults to `["year", "month", "week", "day", "hour", "minute"]`.

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

## `transform`

Specifies array of transformers to apply to the result.

::: info NOTE

This option is not part of [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat) API.

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
