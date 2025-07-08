---
title: autoFormat
entity:
  type: other
  pkg: format
  name: autoFormat
  summary: Value formatted according to its type
  example: autoFormat("Automatic formatting")
  configurable: false
  maturity: public
  related:
    - percentFormatter
---

<script setup>
  import { autoFormat } from '@localizer/format';

  const data = {
    formatter: autoFormat,
    inputs: [
      ['"Hello, world!"', 'Hello, world!'],
      ['undefined', undefined],
      ['null', null],
      ['true', true],
      ['42', 42],
      ['Math.PI', Math.PI],
      ['Infinity', Infinity],
      ['-Infinity', -Infinity],
      ['NaN', NaN],
      ['[1, 2, 3]', [1, 2, 3]],
      ['{ a: 1, b: 2 }', { a: 1, b: 2 }],
      ['/abc/', /abc/],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ['function() {}', function () {}],
      ['new Date(2025, 5, 1)', new Date(2025, 5, 1)],
    ],
  }
</script>

# autoFormat <Package name="format"/>

This formatter transforms any value into a locale-aware `Localizable` by leveraging [preconfigured formatters](../index.md). By default, it applies the following formatter based on the value's type:

| Type                                               | Default Formatter                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `number`, `bigint`, `Number`                       | [Decimal formatter](../amounts/decimal.md)                             |
| `Date`                                             | [Date formatter](../dates-and-times/date.md)                           |
| Array                                              | [List formatter](../other/list.md), applies `autoFormat` to each entry |
| [`Localizable`](../../introduction/localizable.md) | Returned as-is                                                         |
| `undefined`, `null`                                | Empty value                                                            |
| `string`, `boolean`                                | [Stringification formatter](./stringify.md)                            |
| Other                                              | [Stringification formatter](./stringify.md)                            |

You can customize the behavior of `autoFormat` by configuring the [`DefaultFormatters`](../../introduction/configuration.md#defaultformatters) settings. This allows you to specify which formatters should be applied to different value types.

```typescript
configure(
  { DefaultFormatters },
  {
    DefaultFormatters: {
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

## Usage

```typescript twoslash
import { autoFormat } from '@localizer/format';

const result = autoFormat('Automatic formatting');
```

**Examples:**

<table tabindex="0">
  <thead>
    <tr>
      <th>Input value</th>
      <th>Formatted value</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(input, index) in data.inputs" :key="index">
      <td>
        <code>
          {{ input[0] }}
        </code>
      </td>
      <td>
        {{ data.formatter(...input.slice(1)).localize('en-US') }}
      </td>
    </tr>
  </tbody>
</table>

## See also

<Entities />
