---
order: 2
---

<script setup>
import DemoValueFormatterOptions from '../../DemoValueFormatterOptions.vue';
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

The formatting that should be displayed for the number. Possible values are:

- `"standard"` **(default)** - Plain number formatting.
- `"scientific"` - Return the order-of-magnitude for formatted number.
- `"engineering"` - Return the exponent of ten when divisible by three.
- `"compact"` - String representing exponent; defaults to using the "short" form.

::: info NOTE
This option affects [significant and fractional digits option defaults](digit-options.md#significant-and-fraction-digits-default-values)
:::

**Examples:**

<DemoValueFormatterOptions option="notation" :values="['standard','scientific','engineering','compact']" :factory=decimalFormatter :inputs=digitInputs />

## `compactDisplay`

Only used when `notation` is `"compact"`. Possible values are `"short"` and `"long"`; the default is `"short"`.

**Examples:**

::: details Formatter options used in this example

```typescript
{
  notation: 'compact';
}
```

:::

<DemoValueFormatterOptions option="compactDisplay" :defaultOptions="{ notation: 'compact' }" :values="['short','long']" :factory=decimalFormatter :inputs=digitInputs />

## `useGrouping`

Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.

- `"always"` - Display grouping separators even if the locale prefers otherwise.
- `"auto"` - Display grouping separators based on the locale preference, which may also be dependent on the currency.
- `"min2"` - Display grouping separators when there are at least 2 digits in a group.
- `true` - Same as `"always"`.
- `false` - Display no grouping separators.

The default is `"min2"` if [`notation`](#notation) is `"compact"`, and `"auto"` otherwise.

<DemoValueFormatterOptions option="useGrouping" :values="['always','auto', 'min2', true, false]" :factory=decimalFormatter :inputs=groupingInputs />

## `signDisplay`

When to display the sign for the number. Possible values are:

- `"auto"` **(default)** - Sign display for negative numbers only, including negative zero.
- `"always"` - Always display sign.
- `"exceptZero"` - Sign display for positive and negative numbers, but not zero.
- `"negative"` - Sign display for negative numbers only, excluding negative zero.
- `"never"` - Never display sign.

**Examples:**

<DemoValueFormatterOptions option="signDisplay" :values="['auto','always','exceptZero','negative','never']" :factory=decimalFormatter :inputs=signInputs />

## `parts`

An array of localized value parts to extract. Possible values are:

| Value                 | Description                                                                                                                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"literal"`           | Any string that's a part of the format pattern; for example `" "`. Note that common tokens like the decimal separator or the plus/minus signs have their own token types.                                                                                         |
| `"integer"`           | The integral part of the number, or a segment of it if using grouping (controlled by [`useGrouping`](#usegrouping)).                                                                                                                                              |
| `"group"`             | The group separator string, such as `","`. Only present when using grouping (controlled by [`useGrouping`](#usegrouping)).                                                                                                                                        |
| `"decimal"`           | The decimal separator string, such as `"."`. Only present when fraction is present.                                                                                                                                                                               |
| `"fraction"`          | The fractional part of the number.                                                                                                                                                                                                                                |
| `"compact"`           | The compact exponent, such as `"M"` or `"thousands"`. Only present when [`notation`](#notation) is `"compact"`. The form (`"short"` or `"long"`) can be controlled via [`compactDisplay`](#compactdisplay).                                                       |
| `"exponentSeparator"` | The exponent separator, such as `"E"`. Only present when [`notation`](#notation) is `"scientific"` or `"engineering"`.                                                                                                                                            |
| `"exponentMinusSign"` | The exponent minus sign string, such as `"-"`. Only present when [`notation`](#notation) is `"scientific"` or `"engineering"` and the exponent is negative.                                                                                                       |
| `"exponentInteger"`   | The exponent's integer value. Only present when [`notation`](#notation) is `"scientific"` or `"engineering"`.                                                                                                                                                     |
| `"nan"`               | A string representing NaN, such as `"NaN"`. This is the sole token representing the number itself when the number is NaN.                                                                                                                                         |
| `"infinity"`          | A string representing Infinity or -Infinity, such as `"∞"`. This is the sole token representing the number itself when the number is Infinity or -Infinity.                                                                                                       |
| `"plusSign"`          | The plus sign, such as `"+"`.                                                                                                                                                                                                                                     |
| `"minusSign"`         | The minus sign, such as `"-"`.                                                                                                                                                                                                                                    |
| `"percentSign"`       | The percent sign, such as `"%"`. Only applicable to percentFormatter.                                                                                                                                                                                             |
| `"unit"`              | The unit string, such as `"l"` or `"litres"`. Only applicable to unitFormatter. The form (`"short"`, `"narrow"`, or `"long"`) can be controlled via [`unitDisplay`](unit-and-currency-options.md#unitdisplay).                                                    |
| `"currency"`          | The currency string, such as `"$"`, `"€"`, `"Dollar"`, or `"Euro"`. Only applicable to currencyFormatter. The form (`"code"`, `"symbol"`, `"narrowSymbol"`, or `"name"`) can be controlled via [`currencyDisplay`](unit-and-currency-options.md#currencydisplay). |
| `"unknown"`           | Reserved for any token that's not recognized as one of the above; should be rarely encountered.                                                                                                                                                                   |

::: info NOTE

This option reflects `type` fields of the returned value of [`Intl.NumberFormat.formatToParts()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)

:::

## `transform`

Specifies array of transformers to apply to the result.

::: info NOTE

This option is not part of [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) API.

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
