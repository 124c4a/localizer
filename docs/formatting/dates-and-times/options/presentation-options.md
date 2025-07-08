---
order: 3
---

# Presentation options

<script setup>
import { dateTimeFormatter } from '@localizer/all';

const dateInputs = (now) => [
  ['1980-06-19 00:05:31', new Date("1980-06-19 00:05:31")],
  ['2020-10-02 23:59:01', new Date("2020-10-02 23:59:01")],
];
</script>

## `hour12`

Whether to use 12-hour time (`true`) or 24-hour time (`false`). The default depends on the locale. When `true`, `hourCycle` is set to `"h11"` or `"h12"`. When `false`, it is set to `"h23"`.

::: warning

Options `hour12` and `hourCycle` cannot be used simultaneously.

:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  timeStyle: 'medium';
}
```

:::

<OptionsDemo option="hour12" :values="[true, false]" :defaultOptions="{ timeStyle: 'medium' }":factory=dateTimeFormatter :inputs=dateInputs />

## `hourCycle`

The hour cycle to use: `"h11"`, `"h12"`, `"h23"`, or `"h24"`.

::: warning

Options `hour12` and `hourCycle` cannot be used simultaneously.

:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  timeStyle: 'medium';
}
```

:::

<OptionsDemo option="hourCycle" :values="['h11', 'h12', 'h23', 'h24']" :defaultOptions="{ timeStyle: 'medium' }":factory=dateTimeFormatter :inputs=dateInputs />

## `parts`

An array of localized value parts to extract. Possible values include:

- `"weekday"`: For example, "M", "Monday", or "Montag".
- `"era"`: For example, "BC" or "AD".
- `"year"`: For example, "2012" or "96".
- `"month"`: For example, "12" or "January".
- `"day"`: For example, "17".
- `"dayPeriod"`: For example, "AM", "PM", "in the morning", or "noon".
- `"hour"`: For example, "3" or "03".
- `"minute"`: For example, "00".
- `"second"`: For example, "07" or "42".
- `"fractionalSecond"`: For example, "0", "00", or "000".
- `"timeZoneName"`: For example, "UTC", "CET", or "Central European Time".
- `"literal"`: Any string that's part of the format pattern and not influenced by the date, such as "/", ", ", or "o'clock".
- `"relatedYear"`: A 4-digit Gregorian year, used when the calendar's representation includes a year name instead of a year, e.g., "2019".
- `"yearName"`: The name of the year, typically in calendars without continuous years, e.g., "geng-zi".
- `"unknown"`: Reserved for unrecognized tokens; rarely encountered.

::: info NOTE

This option corresponds to the `type` fields returned by [`Intl.DateTimeFormat.formatToParts()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts).

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
