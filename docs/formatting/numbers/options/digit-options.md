---
order: 1
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

const roundingInputs = () => [
  [`1.3`, 1.3],
  [`1.5`, 1.5],
  [`1.8`, 1.8],
  [`-1.3`, -1.3],
  [`-1.5`, -1.5],
  [`-1.8`, -1.8],
  [`2.5`,2.5],
  [`-2.5`,-2.5],
];

const zeroesInputs = () => [
  ['1', 1], 
  ['1.01', 1.01], 
  ['1.001', 1.001], 
  ['1.0001', 1.0001], 
];


</script>

# Digit options

## `minimumIntegerDigits`

The minimum number of integer digits to use. A value with a smaller number of integer digits than this number will be left-padded with zeros (to the specified length) when formatted. Possible values are from `1` to `21`; the default is `1`.

**Examples:**

<DemoValueFormatterOptions option="minimumIntegerDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `minimumFractionDigits`

The minimum number of fraction digits to use. Possible values are from `0` to `100`; the default for plain number and percent formatting is `0`; the default for currency formatting is the number of minor unit digits provided by the [ISO 4217 currency code list](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml) (2 if the list doesn't provide that information). See [SignificantDigits/FractionDigits] default values for when this default gets applied.

**Examples:**

<DemoValueFormatterOptions option="minimumFractionDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `maximumFractionDigits`

The maximum number of fraction digits to use. Possible values are from `0` to `100`; the default for plain number formatting is the larger of [`minimumFractionDigits`](#minimumfractiondigits) and `3`; the default for currency formatting is the larger of ['minimumFractionDigits'](#minimumfractiondigits) and the number of minor unit digits provided by the [ISO 4217 currency code list](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml) (`2` if the list doesn't provide that information); the default for percent formatting is the larger of [`minimumFractionDigits`](#minimumfractiondigits) and 0. See [SignificantDigits/FractionDigits] default values for when this default gets applied.

**Examples:**

<DemoValueFormatterOptions option="maximumFractionDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `minimumSignificantDigits`

The minimum number of significant digits to use. Possible values are from `1` to `21`; the default is `1`. See [SignificantDigits/FractionDigits] default values for when this default gets applied.

**Examples:**

<DemoValueFormatterOptions option="minimumSignificantDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `maximumSignificantDigits`

The maximum number of significant digits to use. Possible values are from `1` to `21`; the default is `21`. See [SignificantDigits/FractionDigits] default values for when this default gets applied.

**Examples:**

<DemoValueFormatterOptions option="maximumSignificantDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `roundingPriority`

Specify how rounding conflicts will be resolved if both fraction digits options ([`minimumFractionDigits`](#minimumfractiondigits)/[`maximumFractionDigits`](#maximumfractiondigits)) and significant digits options ([`minimumSignificantDigits`](#minimumsignificantdigits)/[`maximumSignificantDigits`](#maximumsignificantdigits)) are specified. Possible values are:

- `"auto"` (**default**) - The result from the significant digits property is used.
- `"morePrecision"` - The result from the property that results in more precision is used.
- `"lessPrecision"` - The result from the property that results in less precision is used.

The value `"auto"` is normalized to `"morePrecision"` if [`notation`](presentation-options.md#notation) is `"compact"` and none of the four fraction digits/significant digits options are set.

::: info NOTE
With values other than `auto` the result with more precision is calculated from the [`maximumSignificantDigits`](#maximumsignificantdigits) and [`maximumFractionDigits`](#maximumfractiondigits) (minimum fractional and significant digit settings are ignored).

See [significant and fractional digits option defaults](#significant-and-fraction-digits-default-values) for additional information.
:::

**Examples:**

::: details Formatter options used in this example

```typescript
{
  minimumSignificantDigits: 3;
  maximumSignificantDigits: 6;
  minimumFractionDigits: 3;
}
```

:::

<DemoValueFormatterOptions option="roundingPriority" :defaultOptions="{ minimumSignificantDigits: 3, maximumSignificantDigits: 6, minimumFractionDigits: 3 }" :values="['auto','morePrecision','lessPrecision']" :factory=decimalFormatter :inputs=digitInputs />

## `roundingMode`

How decimals should be rounded. Possible values are:

| Rounding mode                | Description                                                                                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"ceil"`                     | Round toward +∞. Positive values round up. Negative values round "more positive".                                                                                                                                       |
| `"floor"`                    | Round toward -∞. Positive values round down. Negative values round "more negative".                                                                                                                                     |
| `"expand"`                   | Round away from 0. The magnitude of the value is always increased by rounding. Positive values round up. Negative values round "more negative".                                                                         |
| `"trunc"`                    | Round toward 0. This magnitude of the value is always reduced by rounding. Positive values round down. Negative values round "less negative".                                                                           |
| `"halfCeil"`                 | Ties toward +∞. Values above the half-increment round like `"ceil"` (towards +∞), and below like `"floor"` (towards -∞). On the half-increment, values round like `"ceil"`.                                             |
| `"halfFloor"`                | Ties toward -∞. Values above the half-increment round like `"ceil"` (towards +∞), and below like `"floor"` (towards -∞). On the half-increment, values round like `"floor"`.                                            |
| `"halfExpand"` (**default**) | Ties away from 0. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment, values round like `"expand"`.                                    |
| `"halfTrunc"`                | Ties toward 0. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment, values round like `"trunc"`.                                        |
| `"halfEven"`                 | Ties towards the nearest even integer. Values above the half-increment round like `"expand"` (away from zero), and below like `"trunc"` (towards 0). On the half-increment values round towards the nearest even digit. |

**Examples:**

::: details Formatter options used in this example

```typescript
{
  maximumSignificantDigits: 1;
}
```

:::

<DemoValueFormatterOptions option="roundingMode" :defaultOptions="{ maximumSignificantDigits: 1 }" :values="['ceil','floor','expand','trunc','halfCeil','halfFloor','halfExpand','halfTrunc','halfEven']" :factory=decimalFormatter :inputs=roundingInputs />

## `trailingZeroDisplay`

The strategy for displaying trailing zeros on whole numbers. Possible values are:

- `"auto"` **(default)** - Keep trailing zeros according to `minimumFractionDigits` and `minimumSignificantDigits`.
- `"stripIfInteger"` - Remove the fraction digits if they are all zero. This is the same as `"auto"` if any of the fraction digits is non-zero.

**Examples:**

::: details Formatter options used in this example

```typescript
{
  minimumFractionDigits: 2;
}
```

:::

<DemoValueFormatterOptions option="trailingZeroDisplay" :defaultOptions="{ minimumFractionDigits: 2 }" :values="['auto','stripIfInteger']" :factory=decimalFormatter :inputs=zeroesInputs />

---

### Significant and fraction digits default values

For the four options above (the fraction digits and significant digits options), we mentioned their defaults; however, these defaults are not unconditionally applied. They are only applied when the property is actually going to be used, which depends on the [`roundingPriority`](#roundingpriority) and [`notation`](presentation-options.md#notation) settings. Specifically:

- If `roundingPriority` is not `"auto"`, then all four options apply.
- If `roundingPriority` is `"auto"` and at least one significant digits option is set, then the significant digits options apply and the fraction digits options are ignored.
- If `roundingPriority` is `"auto"`, and either at least one fraction digits option is set or [`notation`](presentation-options.md#notation) is not `"compact"`, then the fraction digits options apply and the significant digits options are ignored.
- If `roundingPriority` is `"auto"`, [`notation`](presentation-options.md#notation) is `"compact"`, and none of the four options are set, then they are set to `{ minimumFractionDigits: 0, maximumFractionDigits: 0, minimumSignificantDigits: 1, maximumSignificantDigits: 2 }`, regardless of the defaults mentioned above, and `roundingPriority` is set to `"morePrecision"`.

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
