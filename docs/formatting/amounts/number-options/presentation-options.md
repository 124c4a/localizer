---
order: 1
---

<script setup>
import { decimalFormatter } from '@localizer/all';

const digitInputs = () => [
  ['1.2', 1.2],
  ['12.34', 12.34],
  ['123.456', 123.456],
  ['1234.5678', 1234.5678],
  ['12345.67891', 12345.67891]
];

const groupingInputs = () => [
  ['1', 1],
  ['10', 10],
  ['100', 100],
  ['1000', 1000],
  ['10000', 10000],
  ['100000', 100000],
  ['1000000', 1000000],
];

const signInputs = () => [
  ['100000', 100000],
  ['-100000', -100000],
  ['0', 0],
  ['0.0000001', 0.0000001],
  ['-0.0000001', -0.0000001],
];

</script>

# Presentation options

## `notation`

The formatting options for numbers are:

- `"standard"` (default): Plain number formatting.
- `"scientific"`: Displays the order of magnitude.
- `"engineering"`: Displays the exponent in multiples of three.
- `"compact"`: Uses a compact notation (e.g., "short" form by default).

::: info NOTE

This option affects [significant and fractional digits option defaults](digit-options.md#significant-and-fraction-digits-default-values)

:::

**Examples:**

<OptionsDemo option="notation" :values="['standard','scientific','engineering','compact']" :factory=decimalFormatter :inputs=digitInputs />

## `compactDisplay`

Only applicable when `notation` is `"compact"`. Values: `"short"` (default) or `"long"`.

**Examples:**

::: details Formatter options used in this example

```typescript
{
  notation: 'compact';
}
```

:::

<OptionsDemo option="compactDisplay" :defaultOptions="{ notation: 'compact' }" :values="['short','long']" :factory=decimalFormatter :inputs=digitInputs />

## `useGrouping`

Whether to use grouping separators:

- `"always"` - Always display grouping separators.
- `"auto"` - Display grouping separators based on locale preferences.
- `"min2"` - Display grouping separators for groups with at least 2 digits.
- `true` - Equivalent to `"always"`.
- `false` - No grouping separators.

Default: `"min2"` for `"compact"` notation, `"auto"` otherwise.

<OptionsDemo option="useGrouping" :values="['always','auto', 'min2', true, false]" :factory=decimalFormatter :inputs=groupingInputs />

## `signDisplay`

When to display the sign for the number:

- `"auto"` (default): Display sign for negative numbers, including negative zero.
- `"always"`: Always display the sign.
- `"exceptZero"`: Display sign for non-zero numbers only.
- `"negative"`: Display sign for negative numbers, excluding negative zero.
- `"never"`: Never display the sign.

**Examples:**

<OptionsDemo option="signDisplay" :values="['auto','always','exceptZero','negative','never']" :factory=decimalFormatter :inputs=signInputs />

## `parts`

An array of localized value parts to extract. Possible values:

| Value                 | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| `"literal"`           | Static text in the format, e.g., `" "`.                                                |
| `"integer"`           | Whole number part, or segments if grouping is used.                                    |
| `"group"`             | Group separator, e.g., `","`. Present if grouping is enabled.                          |
| `"decimal"`           | Decimal separator, e.g., `"."`. Present if a fraction exists.                          |
| `"fraction"`          | Fractional part of the number.                                                         |
| `"compact"`           | Compact notation, e.g., `"M"`. Requires `notation: "compact"`.                         |
| `"exponentSeparator"` | Exponent separator, e.g., `"E"`. Requires `notation: "scientific"` or `"engineering"`. |
| `"exponentMinusSign"` | Exponent minus sign, e.g., `"-"`. Present for negative exponents.                      |
| `"exponentInteger"`   | Exponent value. Requires `notation: "scientific"` or `"engineering"`.                  |
| `"nan"`               | Represents NaN, e.g., `"NaN"`.                                                         |
| `"infinity"`          | Represents Infinity, e.g., `"∞"`.                                                      |
| `"plusSign"`          | Plus sign, e.g., `"+"`.                                                                |
| `"minusSign"`         | Minus sign, e.g., `"-"`.                                                               |
| `"percentSign"`       | Percent sign, e.g., `"%"`. Applicable to percentFormatter.                             |
| `"unit"`              | Unit string, e.g., `"l"`. Controlled by `unitDisplay`.                                 |
| `"currency"`          | Currency string, e.g., `"$"`. Controlled by `currencyDisplay`.                         |
| `"unknown"`           | Unrecognized tokens. Rarely encountered.                                               |

::: info NOTE

This option reflects `type` fields of the returned value of [`Intl.NumberFormat.formatToParts()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
