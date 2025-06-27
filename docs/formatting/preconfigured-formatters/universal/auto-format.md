<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Automatic formatting <Badge type="info" text="@localizer/format" />

> **[autoFormat](../../../api/_localizer/format/autoFormat/index.md)** ( `value`: _any_ )
>
> - `value` - The value to format. Can be any JavaScript value.

This formatter converts any value into a locale-aware `Localizable` using [preconfigured formatters](../index.md). It selects a formatter based on the value type:

| Type                                                  | Formatter                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `number`, `bigint`, `Number`                          | [Decimal formatter](../numbers/decimal.md)                                      |
| `Date`                                                | [Date formatter](../dates-and-times/date.md)                                    |
| Array                                                 | [List formatter](../lists-of-items/list.md), applies `autoFormat` to each entry |
| [`Localizable`](../../../introduction/localizable.md) | Returned as-is                                                                  |
| `undefined`                                           | Empty value                                                                     |
| Other                                                 | [Stringification formatter](./stringify.md)                                     |

::: tip

Use `autoFormat` carefully. It handles various value types but lacks strict type safety and customization options.

:::

**Examples:**

<DemoValueFormatter :demo="demos.autoFormat"/>
