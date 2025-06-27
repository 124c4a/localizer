---
order: 3
---

<script setup>
import DemoValueFormatterOptions from '../../DemoValueFormatterOptions.vue';
import { decimalFormatter, currencyFormatter, unitFormatter } from '@localizer/all';

const currencyInputs = () => [
  ['1000, "USD"', 1000, 'USD'], 
  ['-1000, "EUR"', -1000, "EUR"], 
  ['-1000, "CAD"', -1000, "CAD"], 
];

const unitInputs = () => [
  ['0.5, "liter"', 0.5, 'liter'], 
  ['120, "kilometer-per-hour"', 120, "kilometer-per-hour"], 
];


</script>

# Unit and currency options

## `currencyDisplay`

How to display the currency in currency formatting.

- `"code"` - Use the ISO currency code.
- `"symbol"` **(default)** - Use a localized currency symbol such as €.
- `"narrowSymbol"` - Use a narrow format symbol ("$100" rather than "US$100").
- `"name"` - Use a localized currency name such as "dollar".

::: info NOTE
This option is only applicable for `currencyFormatter`
:::

**Examples:**

<DemoValueFormatterOptions option="currencyDisplay" :values="['code','symbol','narrowSymbol','name']" :factory=currencyFormatter :inputs=currencyInputs />

## `currencySign`

In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign. Possible values are `"standard"` and `"accounting"`; the default is `"standard"`.

::: info NOTE
This option is only applicable for `currencyFormatter`
:::

**Examples:**

<DemoValueFormatterOptions option="currencySign" :values="['standard','accounting']" :factory=currencyFormatter :inputs=currencyInputs />

## `unitDisplay`

The unit formatting style to use in unit formatting. Possible values are:

- `"short"` **(default)** - E.g., 16 l.
- `"narrow"` - E.g., 16l.
- `"long"` - E.g., 16 litres.

::: info NOTE
This option is only applicable for `unitFormatter`
:::

**Examples:**

<DemoValueFormatterOptions option="unitDisplay" :values="['short','narrow','long']" :factory=unitFormatter :inputs=unitInputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
