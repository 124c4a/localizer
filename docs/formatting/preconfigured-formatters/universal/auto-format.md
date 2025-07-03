<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Automatic formatting <Package name="format"/>

> **[autoFormat](../../../api/_localizer/format/autoFormat/index.md)** ( `value`: _any_ )
>
> - `value` - The value to format. Can be any JavaScript value.

This formatter transforms any value into a locale-aware `Localizable` by leveraging [preconfigured formatters](../index.md). By default, it applies the following formatter based on the value's type:

| Type                                                  | Default Formatter                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `number`, `bigint`, `Number`                          | [Decimal formatter](../numbers/decimal.md)                                      |
| `Date`                                                | [Date formatter](../dates-and-times/date.md)                                    |
| Array                                                 | [List formatter](../lists-of-items/list.md), applies `autoFormat` to each entry |
| [`Localizable`](../../../introduction/localizable.md) | Returned as-is                                                                  |
| `undefined`, `null`                                   | Empty value                                                                     |
| `string`, `boolean`                                   | [Stringification formatter](./stringify.md)                                     |
| Other                                                 | [Stringification formatter](./stringify.md)                                     |

You can customize the behavior of `autoFormat` by configuring the [`AutoFormat`](../../../introduction/configuration.md#autoformat) settings. This allows you to specify which formatters should be applied to different value types.

```typescript
configure(
  { AutoFormat },
  {
    AutoFormat: {
      number: decimal,
      date: date,
      array: list,
      boolean: stringify,
      string: stringify,
      default: stringify,
    },
  },
);
```

::: warning

Use `autoFormat` carefully. It handles various value types but lacks strict type safety and customization options.

:::

**Examples:**

<DemoValueFormatter :demo="demos.autoFormat"/>
