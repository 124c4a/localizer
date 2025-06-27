---
order: 2
---

# Date/time component options

<script setup>
import DemoValueFormatterOptions from '../../DemoValueFormatterOptions.vue';
import { dateTimeFormatter } from '@localizer/all';

const dateInputs = (now) => [
  ['(now)', now], 
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
- `"narrow"` - E.g., T.

  Two weekdays may have the same narrow style for some locales (e.g., Tuesday's narrow style is also T).

**Examples:**

<DemoValueFormatterOptions option="weekday" :values="['long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `era`

The representation of the era. Possible values are:

- `"long"` - E.g., Anno Domini
- `"short"` - E.g., AD
- `"narrow"` - E.g., A

**Examples:**

<DemoValueFormatterOptions option="era" :values="['long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `year`

The representation of the year. Possible values are `"numeric"` and `"2-digit"`.

**Examples:**

<DemoValueFormatterOptions option="year" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `month`

The representation of the month. Possible values are:

- `"numeric"` - E.g., 3
- `"2-digit"` - E.g., 03
- `"long"` - E.g., March
- `"short"` - E.g., Mar
- `"narrow"` - E.g., M.

  Two months may have the same narrow style for some locales (e.g., May's narrow style is also M).

**Examples:**

<DemoValueFormatterOptions option="month" :values="['numeric', '2-digit', 'long', 'short', 'narrow']" :factory=dateTimeFormatter :inputs=dateInputs />

## `day`

The representation of the year. Possible values are `"numeric"` and `"2-digit"`.

**Examples:**

<DemoValueFormatterOptions option="day" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `dayPeriod`

The formatting style used for day periods like "in the morning", "am", "noon", "n" etc. Possible values are `"narrow"`, `"short"`, and `"long"`.

::: info NOTE

This option only has an effect if a 12-hour clock (`hourCycle`: `"h12"` or `hourCycle`: `"h11"`) is used. Many locales use the same string irrespective of the width specified.

:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  hourCycle: 'h12';
}
```

:::

<DemoValueFormatterOptions option="dayPeriod" :values="['narrow', 'short', 'long']" :defaultOptions="{ hourCycle: 'h12' }" :factory=dateTimeFormatter :inputs=dateInputs />

## `hour`

The representation of the hour. Possible values are `"numeric"` and `"2-digit"`.

**Examples:**

<DemoValueFormatterOptions option="hour" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `minute`

The representation of the hour. Possible values are `"numeric"` and `"2-digit"`.

**Examples:**

<DemoValueFormatterOptions option="minute" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `second`

The representation of the second. Possible values are `"numeric"` and `"2-digit"`.

**Examples:**

<DemoValueFormatterOptions option="second" :values="['numeric', '2-digit']" :factory=dateTimeFormatter :inputs=dateInputs />

## `fractionalSecondDigits`

The number of digits used to represent fractions of a second (any additional digits are truncated). Possible values are from `1` to `3`.

**Examples:**

<DemoValueFormatterOptions option="fractionalSecondDigits" :values="[1, 2, 3]" :factory=dateTimeFormatter :inputs=dateInputs />

## `formatMatcher`

The format matching algorithm to use. Possible values are `"basic"` and `"best fit"`; the default is `"best fit"`. The algorithm for `"best fit"` is implementation-defined, and `"basic"` is [defined by the spec](https://tc39.es/ecma402/#sec-basicformatmatcher).

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
