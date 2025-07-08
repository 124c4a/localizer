---
entity:
  type: other
  pkg: format
  name: stringify
  summary: Formats values using string coercion.
  example: stringify({})
  configurable: false
  maturity: public
  related:
    - autoFormat
---

<script setup>
  import { stringify } from '@localizer/format';

  const data = {
    formatter: stringify,
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

# stringify <Package name="format"/>

Converts any value into a locale-independent `Localizable` using [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). Suitable for simple string representations.

::: warning

Only use `stringify` for simple string representations. For other data types, use specialized formatters.

:::

## Usage

```typescript twoslash
import { stringify } from '@localizer/format';

const result = stringify({});
```

## Demo

<table tabindex="0">
  <thead>
    <tr>
      <th>Input value</th>
      <th>Localized value</th>
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
