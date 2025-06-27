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

How to display the currency in currency formatting:

- `"code"` - ISO currency code (e.g., USD).
- `"symbol"` **(default)** - Localized currency symbol (e.g., €).
- `"narrowSymbol"` - Narrow format symbol (e.g., $100 instead of US$100).
- `"name"` - Localized currency name (e.g., dollar).

::: info NOTE

This option is only applicable for `currencyFormatter`

:::

**Examples:**

<DemoValueFormatterOptions option="currencyDisplay" :values="['code','symbol','narrowSymbol','name']" :factory=currencyFormatter :inputs=currencyInputs />

## `currencySign`

In some locales, the accounting format wraps negative numbers in parentheses instead of using a minus sign. Possible values: `"standard"` (default) and `"accounting"`.

::: info NOTE

This option is only applicable for `currencyFormatter`

:::

**Examples:**

<DemoValueFormatterOptions option="currencySign" :values="['standard','accounting']" :factory=currencyFormatter :inputs=currencyInputs />

## `unitDisplay`

The unit formatting style to use in unit formatting:

- `"short"` **(default)** - Example: 16 l.
- `"narrow"` - Example: 16l.
- `"long"` - Example: 16 litres.

::: info NOTE
This option is only applicable for `unitFormatter`
:::

**Examples:**

<DemoValueFormatterOptions option="unitDisplay" :values="['short','narrow','long']" :factory=unitFormatter :inputs=unitInputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
