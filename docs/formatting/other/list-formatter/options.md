---
order: 2
---

# Options

<script setup>
import { loc } from '@localizer/core';
import { listFormatter } from '@localizer/format-list';

const inputs = () => [
  ['One', [ loc`One` ]],
  ['One, two', [ loc`One`, loc`two` ]],
  ['One, two, three', [ loc`One`, loc`two`, loc`three` ]],
];
</script>

## `type`

Indicates the type of grouping. Possible values are:

- `"conjunction"` **(default)** - For "and"-based grouping of the list items: "A, B, and C"
- `"disjunction"` - For "or"-based grouping of the list items: "A, B, or C"
- `"unit"` - For grouping the list items as a compound unit (neither "and"-based nor "or"-based): "A, B, C"

::: warning

This option cannot be used together with `delimiter`

:::

**Examples:**

<OptionsDemo option="type" :values="['conjunction', 'disjunction', 'unit']" :factory=listFormatter :inputs=inputs />

## `style`

The grouping style determines how list separators and conjunctions are formatted. Possible values:

- `"long"` **(default)** - Standard list format, e.g., "A, B, and C".
- `"short"` - Abbreviated format, e.g., "A, B, & C".
- `"narrow"` - Minimal format, e.g., "A, B, C".

::: warning

This option is incompatible with `delimiter`.

:::

**Examples:**

<OptionsDemo option="style" :values="['long', 'short', 'narrow']" :factory=listFormatter :inputs=inputs />

## `delimiter`

Defines a custom delimiter for the list. Accepts any [Localizable](../../../introduction/localizable.md) value.

::: warning

This option is incompatible with both `type` and `style`.

:::

::: info NOTE

This option is not part of [`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) API.

:::

**Examples:**

<OptionsDemo option="delimiter" :values="[loc`::`, loc` `]" :factory=listFormatter :inputs=inputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
