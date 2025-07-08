---
order: 2
---

# Date/time component options

<script setup>
import { dateTimeFormatter } from '@localizer/format-datetime';

const dateInputs = () => [
  ['1980-06-19 00:05:31', new Date("1980-06-19 00:05:31")],
  ['2020-10-02 23:59:01', new Date("2020-10-02 23:59:01")],
];
</script>

::: warning

These options are incompatible with [presets](./presets.md) and cannot be used simultaneously.

:::

## `weekday`

The representation of the weekday. Possible values are:

- `"long"` - E.g., Thursday
- `"short"` - E.g., Thu
- `"narrow"` - E.g., T

::: info NOTE

Some locales may use the same narrow style for multiple weekdays (e.g., Tuesday and Thursday both use T).

:::

**Examples:**

<OptionsDemo option="weekday" :values="['long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `era`

The representation of the era. Possible values are `"long"`, `"short"`, and `"narrow"`.

**Examples:**

<OptionsDemo option="era" :values="['long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `year`

The year can be displayed as `"numeric"` (e.g., 2023) or `"2-digit"` (e.g., 23).

**Examples:**

<OptionsDemo option="year" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `month`

The representation of the month. Possible values are:

- `"numeric"` - E.g., 3
- `"2-digit"` - E.g., 03
- `"long"` - E.g., March
- `"short"` - E.g., Mar
- `"narrow"` - E.g., M.

::: info NOTE

Two months may have the same narrow style for some locales (e.g., May's narrow style is also M).

:::

**Examples:**

<OptionsDemo option="month" :values="['numeric', '2-digit', 'long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `day`

The day can be displayed as `"numeric"` (e.g., 1) or `"2-digit"` (e.g., 01).

**Examples:**

<OptionsDemo option="day" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `dayPeriod`

The formatting style for day periods such as "am", "noon", or "in the morning". Possible values are `"narrow"`, `"short"`, and `"long"`.

::: info NOTE

This option only applies when using a 12-hour clock (`hourCycle`: `"h12"` or `"h11"`) and may not vary across widths in some locales.

:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  hourCycle: 'h12';
}
```

:::

<OptionsDemo option="dayPeriod" :values="['narrow', 'short', 'long']" :defaultOptions="{ hourCycle: 'h12' }" :factory=dateTimeFormatter :inputs=dateInputs />

## `hour`

The hour can be displayed as `"numeric"` (e.g., 1) or `"2-digit"` (e.g., 01).

**Examples:**

<OptionsDemo option="hour" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `minute`

The minute can be displayed as `"numeric"` (e.g., 1) or `"2-digit"` (e.g., 01).

**Examples:**

<OptionsDemo option="minute" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `second`

The second can be displayed as `"numeric"` (e.g., 1) or `"2-digit"` (e.g., 01).

**Examples:**

<OptionsDemo option="second" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `fractionalSecondDigits`

The number of fractional second digits to display. Valid values are `1`, `2`, or `3`. Extra digits are truncated.

**Examples:**

<OptionsDemo option="fractionalSecondDigits" :values="[1, 2, 3]" :factory=dateTimeFormatter :inputs=dateInputs />

## `formatMatcher`

The format matching algorithm to use. Possible values are `"basic"` and `"best fit"`. The default is `"best fit"`. `"Basic"` follows the [specification](https://tc39.es/ecma402/#sec-basicformatmatcher), while `"best fit"` is implementation-defined.

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
