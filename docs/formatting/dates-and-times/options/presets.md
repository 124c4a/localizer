---
order: 1
---

# Presets

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

These options are incompatible with [date and time component options](./date-time-component-options.md) and cannot be used simultaneously.

:::

## `dateStyle`

The date formatting style to use. Possible values are `"full"`, `"long"`, `"medium"`, and `"short"`. It expands to styles for weekday, day, month, year, and era, with the exact combination of values depending on the locale.

**Examples:**

<DemoValueFormatterOptions option="dateStyle" :values="['full', 'long', 'medium', 'short']" :factory=dateTimeFormatter :inputs=dateInputs />

## `timeStyle`

The time formatting style to use. Possible values are `"full"`, `"long"`, `"medium"`, and `"short"`. It expands to styles for hour, minute, second, and timeZoneName, with the exact combination of values depending on the locale.

**Examples:**

<DemoValueFormatterOptions option="timeStyle" :values="['full', 'long', 'medium', 'short']" :factory=dateTimeFormatter :inputs=dateInputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
