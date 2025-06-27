<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Automatic formatting <Badge type="info" text="@localizer/format" />

> **[autoFormat](../../../api/_localizer/format/autoFormat/index.md)** ( `value`: _any_ )
>
> - `value` - The value to format. Can be any JavaScript value.

This is a universal data formatter that converts any value into a locale-dependent `Localizable` using [preconfigured formatters](../index.md). It is useful for scenarios where exact value type is unknown.

Depending on value type, it uses the following formatters:

| Type                                                  | Formatter                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `number`, `bigint`, or `Number`                       | [decimal formatter](../numbers/decimal.md)                                                     |
| `Date`                                                | [date formatter](../dates-and-times/date.md)                                                   |
| Array                                                 | [generic list formatter](../lists-of-items/list.md), applying `autoFormat` to each array entry |
| [`Localizable`](../../../introduction/localizable.md) | Returned without changes                                                                       |
| `undefined`                                           | Empty value                                                                                    |
| Other types                                           | [stringification formatter](./stringify.md)                                                    |

::: tip

Use `autoFormat` judiciously. While it provides flexibility by handling various value types, it does not enforce strict type safety or allow for local customization of formatter properties.

:::

**Examples:**

<DemoValueFormatter :demo="demos.autoFormat"/>
