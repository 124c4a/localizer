---
order: 3
---

# Presentation options

<script setup>
import DemoValueFormatterOptions from '../../DemoValueFormatterOptions.vue';
import { dateTimeFormatter } from '@localizer/all';

const dateInputs = (now) => [
  ['(now)', now], 
  ['1980-06-19 00:05:31', new Date("1980-06-19 00:05:31")], 
  ['2020-10-02 23:59:01', new Date("2020-10-02 23:59:01")], 
];
</script>

## `hour12`

Whether to use 12-hour time (as opposed to 24-hour time). Possible values are `true` and `false`; the default is locale dependent. When `true`, this option sets `hourCycle` to either `"h11"` or `"h12"`, depending on the locale. When `false`, it sets `hourCycle` to `"h23"`.

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

<DemoValueFormatterOptions option="hour12" :values="[true, false]" :defaultOptions="{ timeStyle: 'medium' }":factory=dateTimeFormatter :inputs=dateInputs />

## `hourCycle`

The hour cycle to use. Possible values are `"h11"`, `"h12"`, `"h23"`, and `"h24"`.

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

<DemoValueFormatterOptions option="hourCycle" :values="['h11', 'h12', 'h23', 'h24']" :defaultOptions="{ timeStyle: 'medium' }":factory=dateTimeFormatter :inputs=dateInputs />

## `parts`

An array of localized value parts to extract. Possible values are:

| Value                | Description                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"weekday"`          | For example "M", "Monday", or "Montag".                                                                                                                                |
| `"era"`              | For example "BC" or "AD".                                                                                                                                              |
| `"year"`             | For example "2012" or "96".                                                                                                                                            |
| `"month"`            | For example "12" or "January".                                                                                                                                         |
| `"day"`              | For example "17".                                                                                                                                                      |
| `"dayPeriod"`        | For example "AM", "PM", "in the morning", or "noon".                                                                                                                   |
| `"hour"`             | For example "3" or "03".                                                                                                                                               |
| `"minute"`           | For example "00".                                                                                                                                                      |
| `"second"`           | For example "07" or "42".                                                                                                                                              |
| `"fractionalSecond"` | For example "0", "00", or "000".                                                                                                                                       |
| `"timeZoneName"`     | For example "UTC", "CET", or "Central European Time".                                                                                                                  |
| `"literal"`          | Any string that's a part of the format pattern and not influenced by the date; for example "/", ", ", "o'clock", "de", " ", etc.                                       |
| `"relatedYear"`      | A 4-digit Gregorian year, in the event that the calendar's representation would be a yearName instead of a year; for example "2019". See named years for more details. |
| `"yearName"`         | The name given to the year, usually in calendars without the concept of continuous years; for example "geng-zi".                                                       |
| `"unknown"`          | Reserved for any token that's not recognized as any of the above; should be rarely encountered.                                                                        |

::: info NOTE

This option reflects `type` fields of the returned value of [`Intl.DateTimeFormat.formatToParts()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)

:::

## `transform`

Specifies array of transformers to apply to the result.

::: info NOTE

This option is not part of [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) API.

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
