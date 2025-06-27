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

The minimum number of integer digits to use. Values with fewer digits are left-padded with zeros to meet the specified length. Valid range: `1` to `21` (default: `1`).

**Examples:**

<DemoValueFormatterOptions option="minimumIntegerDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `minimumFractionDigits`

The minimum number of fraction digits to display. Valid range: `0` to `100`. Defaults: `0` for plain numbers and percentages, or `2` for currencies (based on [ISO 4217](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml)). See [significant and fraction digits default values](#significant-and-fraction-digits-default-values) for details.

**Examples:**

<DemoValueFormatterOptions option="minimumFractionDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `maximumFractionDigits`

The maximum number of fraction digits to use. Valid range: `0` to `100`. Defaults:

- Plain numbers: The larger of [`minimumFractionDigits`](#minimumfractiondigits) or `3`.
- Currencies: The larger of [`minimumFractionDigits`](#minimumfractiondigits) or the minor unit digits from the [ISO 4217 currency code list](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml) (`2` if unspecified).
- Percentages: The larger of [`minimumFractionDigits`](#minimumfractiondigits) or `0`.

See [significant and fraction digits default values](#significant-and-fraction-digits-default-values) for details.

**Examples:**

<DemoValueFormatterOptions option="maximumFractionDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `minimumSignificantDigits`

The minimum number of significant digits to use. Possible values are from `1` to `21`; the default is `1`. See [significant and fraction digits default values](#significant-and-fraction-digits-default-values) default values for when this default gets applied.

**Examples:**

<DemoValueFormatterOptions option="minimumSignificantDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `maximumSignificantDigits`

The maximum number of significant digits to use. Valid range: `1` to `21` (default: `21`). See [significant and fraction digits default values](#significant-and-fraction-digits-default-values) for details.

**Examples:**

<DemoValueFormatterOptions option="maximumSignificantDigits" :values="[1, 2, 3, 4]" :factory=decimalFormatter :inputs=digitInputs />

## `roundingPriority`

Specify how rounding conflicts are resolved when both fraction digits options ([`minimumFractionDigits`](#minimumfractiondigits)/[`maximumFractionDigits`](#maximumfractiondigits)) and significant digits options ([`minimumSignificantDigits`](#minimumsignificantdigits)/[`maximumSignificantDigits`](#maximumsignificantdigits)) are set:

- `"auto"` (**default**) - Uses the result from significant digits.
- `"morePrecision"` - Chooses the property yielding more precision.
- `"lessPrecision"` - Chooses the property yielding less precision.

If [`notation`](presentation-options.md#notation) is `"compact"` and none of these options are set, `"auto"` is normalized to `"morePrecision"`.

::: info NOTE

With values other than `auto`, the result is determined by [`maximumSignificantDigits`](#maximumsignificantdigits) and [`maximumFractionDigits`](#maximumfractiondigits), ignoring minimum digit settings. See [default values](#significant-and-fraction-digits-default-values) for details.

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

How decimals are rounded. Possible values:

| Rounding mode  | Description                            |
| -------------- | -------------------------------------- |
| `"ceil"`       | Round up (toward +∞).                  |
| `"floor"`      | Round down (toward -∞).                |
| `"expand"`     | Round away from 0.                     |
| `"trunc"`      | Round toward 0.                        |
| `"halfCeil"`   | Ties round up (toward +∞).             |
| `"halfFloor"`  | Ties round down (toward -∞).           |
| `"halfExpand"` | Ties round away from 0 (**default**).  |
| `"halfTrunc"`  | Ties round toward 0.                   |
| `"halfEven"`   | Ties round to the nearest even number. |

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

The strategy for displaying trailing zeros on whole numbers:

- `"auto"` (default): Retains trailing zeros based on `minimumFractionDigits` and `minimumSignificantDigits`.
- `"stripIfInteger"`: Removes fraction digits if all are zero; behaves like `"auto"` if any fraction digit is non-zero.

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

For the four options above, defaults are applied only when the property is used, based on [`roundingPriority`](#roundingpriority) and [`notation`](presentation-options.md#notation):

- If `roundingPriority` is not `"auto"`, all four options apply.
- If `roundingPriority` is `"auto"` and a significant digits option is set, only significant digits options apply.
- If `roundingPriority` is `"auto"` and a fraction digits option is set or [`notation`](presentation-options.md#notation) is not `"compact"`, only fraction digits options apply.
- If `roundingPriority` is `"auto"`, [`notation`](presentation-options.md#notation) is `"compact"`, and none of the four options are set, they default to `{ minimumFractionDigits: 0, maximumFractionDigits: 0, minimumSignificantDigits: 1, maximumSignificantDigits: 2 }` with `roundingPriority` set to `"morePrecision"`.

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
